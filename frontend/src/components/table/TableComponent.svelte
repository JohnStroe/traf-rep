<script>
    import {
        createDataTableStore,
        dataTableHandler,
        tableInteraction,
        tableA11y, Paginator
    } from '@skeletonlabs/skeleton';
    import data from '../../data/data.json'

    const httpData = data
    let page = {
        offset: 0,
        limit: 10,
        size: 0,
        amounts: [5, 10, 20, 50, 100, 200]
    }

    const dataTableStore = createDataTableStore(httpData, {
        sort: '',
        search: '',
        pagination: page
    })

    $: dataTableStore.updateSource(httpData);

    dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<div class="mt-5">
    <section class="card variant-glass">
        <div class="card-header">
            <input class="input p-3" bind:value={$dataTableStore.search} type="search" placeholder="Search..."/>
        </div>
        <div class="p-4">
            <div class="table-container">
                <table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                    <thead class="justify-center" on:click={(e) => { dataTableStore.sort(e) }} on:keypress>
                    <tr>
                        <th class="text-center" data-sort="country_emoji">FLAG</th>
                        <th class="text-center" data-sort="continent_name">ZONE</th>
                        <th class="text-center" data-sort="country_name">COUNTRY</th>
                        <th class="text-center" data-sort="city">CITY</th>
                        <th class="text-center" data-sort="ip">IP</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                {row.country_emoji}
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                {row.continent_name}
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                                {row.country_name}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal">
                                {row.city}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal">
                                {row.ip}
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <Paginator bind:settings={$dataTableStore.pagination}/>
        </div>
    </section>
</div>