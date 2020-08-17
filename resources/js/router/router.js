import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Dashboard from "../views/Dashboard";
import Categories from "../views/categories/Categories";
import Home  from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import ForgotPassword from "../views/auth/ForgotPassword";

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
        ],
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },

]

const router = new VueRouter({
    routes, // short for `routes: routes`,
    linkExactActiveClass: "active",
})

export default router
