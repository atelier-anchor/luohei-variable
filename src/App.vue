<template>
  <AppHeader />
  <main>
    <component :is="currentView" />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/header/AppHeader.vue'
import AboutView from '@/components/about/AboutView.vue'
import HomeView from '@/components/home/HomeView.vue'
import RecipeView from '@/components/recipe/RecipeView.vue'
import ResponseView from '@/components/response/ResponseView.vue'
import RippleView from '@/components/ripple/RippleView.vue'
import type { ComputedRef, Ref } from 'vue'

export interface Router {
  routes: any
  currentPath: Ref<string>
  isHome: ComputedRef<boolean>
}

// type Routes = 'recipe' | 'response' | 'ripple' | 'about'
const routes = {
  recipe: RecipeView,
  response: ResponseView,
  ripple: RippleView,
  about: AboutView,
}
const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  const path = currentPath.value.slice(2) as keyof typeof routes
  return path in routes ? routes[path] : HomeView
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
      document.querySelector('body')?.setAttribute('style', 'font-feature-settings: "ss01"')
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
