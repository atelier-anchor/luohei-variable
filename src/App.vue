<template>
  <AppHeader />
  <main>
    <component :is="currentView" />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { isLocaleZh } from '@/i18n'
import AppHeader from '@/components/header/AppHeader.vue'
import AboutView from '@/components/about/AboutView.vue'
import HomeView from '@/components/home/HomeView.vue'
import RecipeView from '@/components/recipe/RecipeView.vue'
import ResponseView from '@/components/response/ResponseView.vue'
import RippleView from '@/components/ripple/RippleView.vue'

const routes: Routes = {
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

const { locale, t } = useI18n()
const isZh = () => navigator.language.split('-')[0] === 'zh'
const isZhHant = () =>
  ['hant', 'hk', 'tw'].some((s) => navigator.language.toLowerCase().indexOf(s) >= 0)
const updateDocumentLocale = () => {
  document.title = t('header.title')
  document.documentElement.lang = locale.value
  const body = document.querySelector('body')
  body?.style.setProperty('font-feature-settings', locale.value === 'zh-hant' ? '"ss01"' : null)
  body?.style.setProperty('--em', isLocaleZh.value ? '1.125rem' : '1rem')
}

onMounted(() => {
  locale.value = isZh() ? (isZhHant() ? 'zh-hant' : 'zh-hans') : 'en'
  updateDocumentLocale()
  window.addEventListener('hashchange', () => (currentPath.value = window.location.hash))
})

watch(() => locale.value, updateDocumentLocale)
</script>

<script lang="ts">
import type { Component, ComputedRef, Ref } from 'vue'

type Route = 'recipe' | 'response' | 'ripple' | 'about'
type Routes = { [key in Route]: Component }

export interface Router {
  routes: Routes
  currentPath: Ref<string>
  isHome: ComputedRef<boolean>
}
</script>
