<script lang="ts">

    import type {Stadium} from "../services/stadium.service";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let stadiums: Stadium[];

    let currentlySelectedStadiumName = undefined;

    $: handleInputChange(currentlySelectedStadiumName);

    function handleInputChange(possiblyStadiumName: string) {
        const possibleStadium = stadiums.find((stadium) => stadium.name === possiblyStadiumName);

        if (!possibleStadium) {
            return;
        }

        dispatch('stadiumSelected', possibleStadium);
    }

</script>

<input list="stadium-search-selector" bind:value={currentlySelectedStadiumName}/>

<datalist id="stadium-search-selector">
    {#each stadiums as stadium}
        <option value="{stadium.name}"></option>
    {/each}
</datalist>
