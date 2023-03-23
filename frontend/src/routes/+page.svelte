<script>
import PieChart from "../components/charts/PieChart.svelte";
import TableComponent from "../components/table/TableComponent.svelte";
</script>

<div>
    <div>
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to your Access Log</h1>
    </div>
    <PieChart/>
    <div>
        <TableComponent/>
    </div>
</div>