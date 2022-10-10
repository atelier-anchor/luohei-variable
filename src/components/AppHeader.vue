<template>
  <header class="sticky top-0 z-10">
    <div class="absolute w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
      <div class="font-optical-size-sm mx-auto flex max-w-screen-2xl gap-4 text-sm">
        <VideoToggler class="grow sm:block" :class="{ hidden: showNav }" />
        <AppNav class="grow sm:block sm:grow-0" :class="{ hidden: !showNav }" />
        <div class="flex gap-4" :class="{ hidden: !isLocaleZh && showNav }">
          <NavToggler class="sm:hidden" @click="showNav = !showNav" />
          <LocaleToggler />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { isLocaleZh } from '@/i18n'
import AppNav from '@/components/AppNav.vue'
import LocaleToggler from '@/components/LocaleToggler.vue'
import NavToggler from '@/components/NavToggler.vue'
import VideoToggler from '@/components/VideoToggler.vue'

const showNav = ref(false)

onMounted(() => {
  window.addEventListener('resize', () => (showNav.value = false))
  window.addEventListener('hashchange', () => (showNav.value = false))
})
</script>
