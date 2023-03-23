<script xmlns="http://www.w3.org/1999/html">
    import {Doughnut} from 'svelte-chartjs';
    import {onMount} from 'svelte';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        CategoryScale,
    } from 'chart.js';
    import {PieCharts} from "../../lib/PieCharts/pie-charts.class";
    import rawEntries from "../../data/data.json";
    import {REGIONS} from "../../lib/PieCharts/constants";

    const pieCharts = new PieCharts(rawEntries, {})
    const regions = REGIONS.map(r => ({...r, isChecked: false}))

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                align: 'start',
                justifyContent: 'space-even',
                usePointStyle: true,
                padding: 10,
                boxWidth: 20,
                position: 'bottom', // set the position to bottom
                labels: {
                    color: 'white'
                }
            },
        },
    };


    onMount(() => {
        regions.forEach((region) => {
            const storedValue = localStorage.getItem(`isChecked${region.name}`);
            if (storedValue !== null) {
                region.isChecked = JSON.parse(storedValue);
            }
        });
    });

    function handleCheckboxChange(event) {
        const {name, checked} = event.target;
        const region = regions.find((region) => region.name === name);
        region.isChecked = checked;
        localStorage.setItem(`isChecked${region.name}`, checked);
    }

</script>

<div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="group relative">
        <h3 class="text-4xl font-bold dark:text-white text-left mb-5">View access in charts</h3>
        <div class="grid grid-cols-3 gap-4">
            {#each regions as region}
                <label class="grid-row-1 col-span-1 flex items-center">
                    <input type="checkbox"
                           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           bind:checked={region.isChecked}
                           name={region.name}
                           on:change={handleCheckboxChange}>
                    <span class="ml-2"> {region.title}</span>
                </label>
            {/each}
        </div>

    </div>
    <dl class="grid grid-cols-1 gap-y-16 gap-x-8 md:grid-cols-2 lg:grid-cols-3 mt-20">
        {#each regions as region}
            {#if region.isChecked}
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                    <label>{region.title}</label>
                    <Doughnut data={pieCharts.dataSet(region.code)}
                              options={options}/>
                </div>
            {/if}
        {/each}
    </dl>
</div>
