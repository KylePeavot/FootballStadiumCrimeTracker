<script lang="ts">
    import {onMount} from "svelte";
    import {type Stadium, StadiumService} from "../../services/stadium.service";

    let stadiums: Stadium[] = [];

    onMount(async () => {
        const stadiumService = new StadiumService();

        stadiums = await stadiumService.getAllStadiums();
    })
</script>


<input list="stadium-search-selector"/>
<datalist id="stadium-search-selector">
    {#each stadiums as stadium}
        <option value="{stadium.name} ({stadium.teamName})"></option>
    {/each}
</datalist>
