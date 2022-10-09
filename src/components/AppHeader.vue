<template>
  <header class="sticky top-0 z-10">
    <div class="absolute w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
      <div
        class="font-optical-size-sm mx-auto flex max-w-screen-2xl text-sm"
        :class="showNav ? 'justify-end' : 'justify-between'"
      >
        <VideoToggler v-if="!showNav" />
        <AppNav :show-nav="showNav" @toggle-nav="showNav = !showNav" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import VideoToggler from '@/components/VideoToggler.vue'
import AppNav from '@/components/AppNav.vue'

const showNav = ref(false)

onMounted(() => {
  window.addEventListener('resize', () => (showNav.value = false))
})
</script>
