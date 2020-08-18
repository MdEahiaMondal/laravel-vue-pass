import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Dashboard from "../views/Dashboard";
import Categories from "../views/categories/Categories";
import Home  from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import ForgotPassword from "../views/auth/ForgotPassword";
import NotFound from "../views/NotFound";

import * as auth from '../apis/auth'

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
                component: Categories,
                beforeEnter(to, from, next){
                    console.log(auth.userAccessRole())
                    if (auth.userAccessRole() === "do_everything"){
                        next();
                    }else{
                        next('/404')
                    }
                }
            },
        ],
        beforeEnter(to, from, next){
            if (!auth.isLogedIn()) {
                next('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/register',
        component: Register,
        beforeEnter(to, from, next) {
            if (auth.isLogedIn()) {
                next('/admin')
            } else {
                next()
            }
        }
    },
    {
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (auth.isLogedIn()) {
                next('/admin')
            } else {
                next()
            }
        }
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/404',
        component: NotFound
    },

]

const router = new VueRouter({
    routes, // short for `routes: routes`,
    linkExactActiveClass: "active",
    mode: 'history'
})

export default router
