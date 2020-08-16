import Vue from 'vue'
import App from "./App.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import router from "./router/router";

import store from './store/index'

import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
