<template>
    <div class="home">
        <navbar></navbar>
        <div id="layoutSidenav">
            <right-side-bar></right-side-bar>
            <div id="layoutSidenav_content">
                <router-view></router-view>
                <footer></footer>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import RightSideBar from "../components/RightSideBar";
import Footer from "../components/Footer";

import * as auth from '../apis/auth'

export default {
    name: "Home",
    components: {Footer, RightSideBar, Navbar},
    beforeCreate: async function () {
        try {
            if(auth.isLogedIn()){
                const res = await auth.profile()
                this.$store.dispatch('getUserProfile', res.data)
            }
        }catch (e){
            console.log(e)
        }
    }
}
</script>

<style scoped>

</style>
