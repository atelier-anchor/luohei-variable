<template>
  <AppHeader />
  <main>
    <component :is="currentView" v-bind="currentProps" />
    <VideoPanel v-if="videoShown" />
  </main>
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import VideoPanel from '@/components/VideoPanel.vue'
import About from '@/layouts/About.vue'
import Home from '@/layouts/Home.vue'
import Recipe from '@/layouts/Recipe.vue'
import Response from '@/layouts/Response.vue'
import Ripple from '@/layouts/Ripple.vue'

const videoShown = ref(false)
provide('video', {
  showVideo: () => (videoShown.value = true),
  closeVideo: () => (videoShown.value = false),
})

const nav = {
  recipe: Recipe,
  response: Response,
  ripple: Ripple,
  about: About,
}
provide('nav', nav)

const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  const path = currentPath.value.slice(2)
  return path in nav ? nav[path] : Home
})
const currentProps = computed(() =>
  currentView.value === Home ? { active: !videoShown.value } : {}
)
provide('currentPath', {
  currentPath,
  isHome: computed(() => currentPath.value === '' || currentPath.value === '#/'),
})

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
  window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))
})
</script>
