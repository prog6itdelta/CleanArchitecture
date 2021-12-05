<script context="module">
    // import Layout from './Layout.svelte'
    // export const layout = Layout
</script>

<script>
    import { inertia } from '@inertiajs/inertia-svelte'
    // $title = 'Home'
    export let portals = []
    export let currentPortal;
</script>


<header>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Select Portal
        </h1>
    </div>
</header>
<main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-8 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {#each portals as portal }
                    <div>
                        <a use:inertia="{{ method: 'post' }}" href="{route('setPortal',portal.id)}">{portal.id} - {portal.name}</a>
                    </div>
                {/each}
                <div>
                    Current Portal: {currentPortal.id} - {currentPortal.name}
                </div>
            </div>
        </div>
        <!-- /End replace -->
    </div>
</main>


