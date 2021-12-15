import { createInertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'

import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Pages/Layout'

require('./bootstrap');

// import Alpine from 'alpinejs';
// window.Alpine = Alpine;
// Alpine.start();

createInertiaApp({
    // resolve: name => require(`./Pages/${name}`),
    resolve: name => {
        let page = require(`./Pages/${name}`).default
        page.layout = page.layout || Layout
        return page
    },
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})

InertiaProgress.init()
