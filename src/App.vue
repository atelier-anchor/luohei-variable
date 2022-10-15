<template>
  <AppHeader />
  <main>
    <component :is="currentView" />
  </main>
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/header/AppHeader.vue'
import About from '@/layouts/About.vue'
import Home from '@/layouts/Home.vue'
import Recipe from '@/layouts/Recipe.vue'
import Response from '@/layouts/Response.vue'
import Ripple from '@/layouts/Ripple.vue'

const routes = {
  recipe: Recipe,
  response: Response,
  ripple: Ripple,
  about: About,
}
const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  const path = currentPath.value.slice(2)
  return path in routes ? routes[path] : Home
})
provide('router', {
  routes,
  currentPath,
  isHome: computed(() => currentPath.value === '' || currentPath.value === '#/'),
})

onMounted(() => {
  const { locale, t } = useI18n()
  if (navigator.language.split('-')[0] === 'zh') {
    const lang = navigator.language.toLowerCase()
    if (['hant', 'hk', 'tw'].some((s) => lang.indexOf(s) >= 0)) {
      locale.value = 'zh-hant'
      document.querySelector('body').style = 'font-feature-settings: "ss01"'
    } else {
      locale.value = 'zh-hans'
    }
  } else {
    locale.value = 'en'
  }
  document.title = t('header.title')
  document.documentElement.lang = locale.value
  window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))
})
</script>
