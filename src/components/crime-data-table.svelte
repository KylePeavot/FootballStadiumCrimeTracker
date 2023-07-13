<script lang="ts">

    import type {CrimeData} from "../services/crime-data.service";

    export let crimeData: CrimeData[];

</script>

{#if crimeData.length}
    <table>
        <tr>
            <th>Type of crime</th>
            <th>Crime reported in</th>
        </tr>
        {#each crimeData as crimeDataItem}
            <tr>
                <td>{crimeDataItem.prettyCategory}</td>
                <td>{crimeDataItem.dateOfCrime.toLocaleDateString('en-GB', {year: 'numeric', month: 'long'})}</td>
            </tr>
        {/each}
    </table>
{:else}
    <p>No crime data available for this stadium or no stadium has been selected</p>
{/if}
<style>
    table {
        text-align: left;
        border-collapse: collapse;
        width: 100%
    }

    table > tr:nth-child(even) {
        background: #d4d4d4;
    }

    td, th {
        border: 1px solid #dddddd;
        padding: 8px;
    }

    tr {
        padding: 8px;
    }
</style>