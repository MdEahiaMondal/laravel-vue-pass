<template>
    <div class="main">
        <navbar></navbar>
        <div id="layoutSidenav">
            <right-side-bar></right-side-bar>
            <div id="layoutSidenav_content">
                <router-view></router-view>
               <footer></footer>
                <FlashMessage :position="'right top'" style="z-index: 10"/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import RightSideBar from "./components/RightSideBar";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: {Footer, RightSideBar, Navbar}
}
</script>

<style scoped>

</style>
