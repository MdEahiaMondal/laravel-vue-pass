<template>
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <router-link to="/admin" class="nav-link">
                        Dashboard
                    </router-link>
                    <router-link to="admin/categories" class="nav-link">
                        categories
                    </router-link>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "RightSideBar"
}
</script>

<style scoped>

</style>
