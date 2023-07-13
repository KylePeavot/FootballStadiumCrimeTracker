<script lang="ts">

    import type {Stadium} from "../services/stadium.service";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let stadiums: Stadium[];

    let currentlySelectedStadiumName = undefined;
    let currentlySelectedStadium: Stadium | undefined = undefined

    $: handleInputChange(currentlySelectedStadiumName);

    function handleInputChange(possiblyStadiumName: string) {
        const possibleStadium = stadiums.find((stadium) => stadium.name === possiblyStadiumName);

        if (!possibleStadium) {
            return;
        }

        currentlySelectedStadium = possibleStadium;
        dispatch('stadiumSelected', possibleStadium);
    }

    function handleClearButtonClicked() {
        currentlySelectedStadiumName = '';
        currentlySelectedStadium = undefined;

        dispatch('stadiumSelected', undefined);
    }
</script>

<div class="stadium-search__container">
    <input list="stadium-search-selector" class="stadium-search__selector" placeholder="Search for a stadium"
           bind:value={currentlySelectedStadiumName}/>
    <button class="stadium-search__clear-button" on:click={handleClearButtonClicked}>Clear</button>
</div>

<datalist id="stadium-search-selector">
    {#each stadiums as stadium}
        <option value="{stadium.name}"></option>
    {/each}
</datalist>

{#if currentlySelectedStadium}
    <div class="stadium-information__container">
        <div>
            <img height="48px" width="48px" src={currentlySelectedStadium.crestUrl}
                 alt="The crest for the selected team"/>
        </div>
        <div class="stadium-information__name-address-container">
            <p class="stadium-information__name-address">{currentlySelectedStadium.teamName}</p>
            <p class="stadium-information__name-address">{currentlySelectedStadium.fullAddress}</p>
        </div>
    </div>
{/if}

<style>
    .stadium-search__container {
        width: 40%;
        display: flex;
        flex-direction: row;
        height: 48px;
        gap: 4px;
    }

    .stadium-search__selector {
        font-size: 16px;
    }

    .stadium-search__clear-button {
        font-size: 16px;
    }

    .stadium-information__container {
        display: flex;
        flex-direction: row;
        gap: 4px;
        padding-top: 8px;
    }

    .stadium-information__name-address-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .stadium-information__name-address {
        margin-block-start: 0;
        margin-block-end: 0;
    }
</style>