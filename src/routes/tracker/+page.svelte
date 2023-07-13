<script lang="ts">
    import {onMount} from "svelte";
    import {type Stadium, StadiumService} from "../../services/stadium.service";
    import type {CrimeData} from "../../services/crime-data.service";
    import {LocationService} from "../../services/location.service";
    import {CrimeDataService} from "../../services/crime-data.service";
    import {CrimeDataTable, StadiumSelector} from "../../components";

    let stadiums: Stadium[] = [];

    let currentlySelectedStadiumName = '';

    let crimeDataPromise: Promise<CrimeData[]> = Promise.resolve([]);

    $: currentlySelectedStadium = getCurrentlySelectedStadium(currentlySelectedStadiumName);

    function getCurrentlySelectedStadium(stadiumName: string): Stadium | undefined {
        return stadiums.find((stadium) => stadium.name === stadiumName);
    }

    async function loadCrimeDataForStadium({detail: stadium}: CustomEvent<Stadium>): Promise<CrimeData[]> {
        const locationService = new LocationService();
        const crimeDataService = new CrimeDataService();

        const coordinatesForStadium = await locationService.getCoordinatesFromPostcode(stadium.postcode);

        if (!coordinatesForStadium) {
            //TODO this is an error state

            return [];
        }

        crimeDataPromise = crimeDataService.getCrimeDataForCoordinates(coordinatesForStadium);
    }

    onMount(async () => {
        const stadiumService = new StadiumService();

        stadiums = await stadiumService.getAllStadiums();
    })
</script>

<article class="crime-data__container">
    <h1>Check the safety of your stadium visit</h1>


    <StadiumSelector stadiums={stadiums} on:stadiumSelected={loadCrimeDataForStadium}/>

    {#await crimeDataPromise}
        Loading...
    {:then crimeData}
        <CrimeDataTable {crimeData}/>
    {/await}
</article>

<style>
    .crime-data__container {
        padding: 8px;
    }

</style>
