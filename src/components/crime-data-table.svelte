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
