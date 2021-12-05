import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Pages/Layout'

require('./bootstrap');

// import Alpine from 'alpinejs';
// window.Alpine = Alpine;
// Alpine.start();


createInertiaApp({
    // resolve: name => require(`./Pages/${name}.svelte`),
    resolve: name => {
        const page = require(`./Pages/${name}.svelte`)
        page.layout = page.layout || Layout
        return page
    },
    setup({ el, App, props }) {
        new App({ target: el, props })
    },
})

InertiaProgress.init()
