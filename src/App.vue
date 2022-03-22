<template>
  <AppHeader :navs="navs" :current-path="currentPath" />
  <component :is="currentView" />
</template>

<script setup>
import { computed, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import About from './layouts/About.vue'
import Demo from './layouts/Demo.vue'
import Home from './layouts/Home.vue'
import Ripple from './layouts/Ripple.vue'
import Sensors from './layouts/Sensors.vue'

const home = {
  title: '主页',
  component: Home,
}
const navs = {
  demo: { title: '字样', component: Demo },
  sensors: { title: '感应', component: Sensors },
  ripple: { title: '涟漪', component: Ripple },
  about: { title: '关于', component: About },
}

const currentPath = ref(window.location.hash)
const currentView = computed(() => (navs[currentPath.value.slice(2)] || home).component)

window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))
</script>

<style>
@font-face {
  font-family: 'LuoHei VF';
  src: url('./assets/LuoHeiVF.woff2') format('woff2');
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-light;
    @apply text-white;
    @apply text-xl;
    font-family: 'LuoHei VF';
    font-variation-settings: 'XWGT' 30, 'YWGT' 30;
  }
}
</style>
