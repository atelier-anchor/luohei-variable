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
          <NavMenuToggler ref="navMenuToggler" @click="showMenu = !showMenu" />
        </div>
      </div>
    </div>
    <Transition>
      <NavMenu
        v-show="showMenu"
        ref="navMenu"
        class="absolute top-[54px] right-8 transition-opacity sm:right-16"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isLocaleZh } from '@/i18n'
import AppNav from '@/components/header/AppNav.vue'
import NavMenu from '@/components/header/NavMenu.vue'
import NavMenuToggler from '@/components/header//NavMenuToggler.vue'
import NavToggler from '@/components/header/NavToggler.vue'
import VideoToggler from '@/components/header/VideoToggler.vue'

const navMenu = ref<InstanceType<typeof NavMenu> | null>(null)
const navMenuToggler = ref<InstanceType<typeof NavMenuToggler> | null>(null)

const showNav = ref(false)
const showMenu = ref(false)
const onClickLink = () => {
  if (!isLocaleZh.value && window.innerWidth < 480) showNav.value = false
}

onMounted(() => {
  window.addEventListener('resize', () => {
    showNav.value = false
    showMenu.value = false
  })
  document.addEventListener('click', (e) => {
    const navMenuElem = navMenu.value?.$el as HTMLElement
    const navMenuTogglerElem = navMenuToggler.value?.$el as HTMLElement
    const target = e.target as Node
    if (showMenu.value && !navMenuElem.contains(target) && !navMenuTogglerElem.contains(target)) {
      showMenu.value = false
    }
  })
})
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
