<template>
  <header class="sticky top-0 z-10">
    <div class="absolute w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
      <div class="font-optical-size-sm mx-auto flex max-w-screen-2xl gap-4 text-sm">
        <VideoToggler class="grow sm:block" :class="{ hidden: showNav }" />
        <AppNav
          class="grow sm:block sm:grow-0"
          :class="{ hidden: !showNav }"
          @click-link="onClickLink"
        />
        <div class="flex gap-4 xs:flex" :class="{ hidden: !isLocaleZh && showNav }">
          <NavToggler
            class="sm:hidden"
            :class="{ 'font-bold': showNav }"
            @click="showNav = !showNav"
          />
          <LocaleToggler />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { isLocaleZh } from '@/i18n'
import AppNav from '@/components/header/AppNav.vue'
import LocaleToggler from '@/components/header/LocaleToggler.vue'
import NavToggler from '@/components/header/NavToggler.vue'
import VideoToggler from '@/components/header/VideoToggler.vue'

const showNav = ref(false)
const onClickLink = () => {
  console.log('Nav click')
  if (!isLocaleZh.value && window.innerWidth < 480) showNav.value = false
}

onMounted(() => window.addEventListener('resize', () => (showNav.value = false)))
</script>