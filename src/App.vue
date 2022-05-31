<template>
  <AppHeader :nav="nav" :current-path="currentPath" @show-video="videoShown = true" />
  <main>
    <component :is="currentView" v-bind="currentProps" />
    <VideoPanel v-if="videoShown" @close-video="videoShown = false" />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import VideoPanel from './components/VideoPanel.vue'
import About from './layouts/About.vue'
import Demo from './layouts/Demo.vue'
import Home from './layouts/Home.vue'
import Ripple from './layouts/Ripple.vue'
import Sensors from './layouts/Sensors.vue'

const videoShown = ref(false)

const nav = {
  demo: { title: '字样', component: Demo },
  sensors: { title: '感应', component: Sensors },
  ripple: { title: '涟漪', component: Ripple },
  about: { title: '关于', component: About },
}

const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  const path = currentPath.value.slice(2)
  return path in nav ? nav[path].component : Home
})
const currentProps = computed(() =>
  currentView.value === Home ? { active: !videoShown.value } : {}
)

window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))
</script>

<style>
@import './assets/style.css';
</style>
