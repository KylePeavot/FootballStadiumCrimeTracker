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

<input list="stadium-search-selector" class="stadium-search-selector" placeholder="Search for a stadium" bind:value={currentlySelectedStadiumName}/>

<datalist id="stadium-search-selector">
    {#each stadiums as stadium}
        <option value="{stadium.name}"></option>
    {/each}
</datalist>

<style>
    .stadium-search-selector {
        font-size: 16px;
        width: 20%;
        padding: 8px 4px;
    }
</style>