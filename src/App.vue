<script setup></script>

<template>
  <NavBar />
  <router-view :key="$route.fullPath" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBar from './components/NavBar.vue'
import {useRoute} from 'vue-router'
export default {
    name: 'App',
    components: {
        NavBar
    }
}

</script>

<style scoped></style>
