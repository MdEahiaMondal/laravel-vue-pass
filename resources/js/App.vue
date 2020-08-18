<template>
    <div class="main">
        <router-view></router-view>
        <FlashMessage :position="'right top'" style="z-index: 10"/>
    </div>
</template>

<script>
export default {
    name: "App",
}
</script>

<style scoped>

</style>
