import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Dashboard from "../views/Dashboard";
import Categories from "../views/categories/Categories";
import Home  from "../views/Home";

const routes = [
    {
        path: '/admin',
        component: Home,
        children: [
            {
                path: 'sdfsd',
                component: Dashboard
            },
            {
                path: 'categories',
                component: Categories
            },
        ]
    },

]

const router = new VueRouter({
    routes, // short for `routes: routes`,
    linkExactActiveClass: "active",
})

export default router
