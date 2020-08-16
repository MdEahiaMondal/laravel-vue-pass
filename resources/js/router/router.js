import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Welcome from "../views/Welcome";
import Categories from "../views/categories/Categories";

const routes = [
    {
        path: '/',
        component: Welcome
    },
    {
        path: '/categories',
        component: Categories
    },
]

const router = new VueRouter({
    routes, // short for `routes: routes`,
    linkExactActiveClass: "active",
})

export default router
