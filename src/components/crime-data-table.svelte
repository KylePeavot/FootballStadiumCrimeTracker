<script lang="ts">

    import type {CrimeData} from "../services/crime-data.service";

    export let crimeData: CrimeData[];

</script>

<table>
    <tr>
        <th>Type of crime</th>
        <th>Date of crime</th>
    </tr>
    {#each crimeData as crimeDataItem}
        <tr>
            <td>{crimeDataItem.prettyCategory}</td>
            <td>{crimeDataItem.dateOfCrime}</td>
        </tr>
    {/each}
</table>

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