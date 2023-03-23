<script>
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/all.css';
    import "../app.postcss";
    import {AppBar, AppShell} from "@skeletonlabs/skeleton";
</script>

<main class="text-center">
    <AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
        <svelte:fragment slot="pageHeader">
            <AppBar>
                <svelte:fragment slot="lead">
                    <div class="flex gap-2">
                        <img src="/logo.png" alt="app-logo" width="50"/>
                    </div>
                </svelte:fragment>
            </AppBar>
        </svelte:fragment>
        <div class="p-10">
           <slot> </slot>
        </div>
        <svelte:fragment slot="footer">
            <div class="bg-gray-800 text-gray-300 py-4">
                <div class="flex gap-2">
                    <img src="/logo.png" alt="app-logo" width="50"/>
                </div>
                <div class="container mx-auto text-center">
                    <p>&copy;M-tag 2023. All rights reserved.</p>
                </div>
            </div>
        </svelte:fragment>
    </AppShell>
</main>
