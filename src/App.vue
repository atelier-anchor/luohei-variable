<template>
  <AppHeader :nav="nav" :current-path="currentPath" @show-video="videoShown = true" />
  <main>
    <component :is="currentView" v-bind="currentProps" />
    <VideoPanel v-if="videoShown" @close-video="videoShown = false" />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppHeader from './components/AppHeader.vue'
import VideoPanel from './components/VideoPanel.vue'
import About from './layouts/About.vue'
import Demo from './layouts/Demo.vue'
import Home from './layouts/Home.vue'
import Ripple from './layouts/Ripple.vue'
import Sensors from './layouts/Sensors.vue'

const videoShown = ref(false)

const nav = {
  demo: Demo,
  sensors: Sensors,
  ripple: Ripple,
  about: About,
}

const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  const path = currentPath.value.slice(2)
  return path in nav ? nav[path] : Home
})
const currentProps = computed(() =>
  currentView.value === Home ? { active: !videoShown.value } : {}
)

window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))

onMounted(() => {
  const { locale, t } = useI18n()
  if (navigator.language.split('-')[0] === 'zh') {
    const lang = navigator.language.toLowerCase()
    if (['hant', 'hk', 'tw'].some((s) => lang.indexOf(s) >= 0)) {
      locale.value = 'zh-hant'
    } else {
      locale.value = 'zh-hans'
    }
  } else {
    locale.value = 'en'
  }
  document.title = t('header.title')
})
</script>
