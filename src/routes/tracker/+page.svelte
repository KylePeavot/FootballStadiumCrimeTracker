<script lang="ts">
    import {onMount} from "svelte";
    import {type Stadium, StadiumService} from "../../services/stadium.service";
    import type {CrimeData} from "../../services/crime-data.service";
    import {LocationService} from "../../services/location.service";
    import {CrimeDataService} from "../../services/crime-data.service";
    import {CrimeDataTable, StadiumSelector} from "../../components";

    let stadiums: Stadium[] = [];

    let crimeDataPromise: Promise<CrimeData[]> = Promise.resolve([]);

    async function loadCrimeDataForStadium({detail: stadium}: CustomEvent<Stadium | undefined>): Promise<CrimeData[]> {
        if (!stadium) {
            crimeDataPromise = Promise.resolve([]);
            return;
        }

        const locationService = new LocationService();
        const crimeDataService = new CrimeDataService();

        const coordinatesForStadium = await locationService.getCoordinatesFromPostcode(stadium!.postcode);

        if (!coordinatesForStadium) {
            return [];
        }

        crimeDataPromise = crimeDataService.getCrimeDataForCoordinates(coordinatesForStadium);
    }

    onMount(async () => {
        const stadiumService = new StadiumService();

        stadiums = await stadiumService.getAllStadiums();
    })
</script>

<article class="container">
    <div class="stadium-selector__container">
        <h1 class="crime-data__selector-title">Check the safety of your stadium visit</h1>

        <StadiumSelector stadiums={stadiums} on:stadiumSelected={loadCrimeDataForStadium}/>
    </div>

    {#await crimeDataPromise}
        Loading...
    {:then crimeData}
        <CrimeDataTable {crimeData}/>
    {/await}
</article>

<style>
    .container {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .stadium-selector__container {
        background: #2563eb;
        color: white;
        padding: 8px;
        border-radius: 8px;
    }

    .crime-data__selector-title {
        font-weight: 500;
        font-size: 32px;
    }

</style>
