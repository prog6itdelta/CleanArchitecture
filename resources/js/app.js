import { createInertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { render } from 'react-dom';

import { InertiaProgress } from '@inertiajs/progress';
import Layout from './Pages/Layout.jsx';
import AdminLayout from './Admin/Layout.jsx';

require('./bootstrap');

createInertiaApp({
  // resolve: name => require(`./Pages/${name}`),
  resolve: (name) => {
    const page = require(`./${name}`).default;
    if (name.startsWith('Admin/')) {
      page.layout = AdminLayout;
    } else if (page.layout === undefined) {
      page.layout = Layout;
    }
    return page;
  },
  setup({ el, App, props }) {
    render(<App {...props} />, el);
  },
});

InertiaProgress.init();
