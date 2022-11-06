<template>
  <header class="sticky top-0 z-10">
    <div class="absolute w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
      <div class="font-optical-size-sm mx-auto flex max-w-screen-2xl gap-4 text-sm">
        <VideoToggler class="grow sm:block" :class="{ hidden: showNav }" />
        <NavBar
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
      <Transition>
        <div v-show="showMenu" class="relative mx-auto max-w-screen-2xl transition-opacity">
          <div class="absolute top-3.5 right-0">
            <NavMenu ref="navMenu" />
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isLocaleZh } from '@/i18n'
import NavBar from '@/components/header/NavBar.vue'
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
    const navMenuElem = navMenu.value?.$el as HTMLElement | null
    const navMenuTogglerElem = navMenuToggler.value?.$el as HTMLElement | null
    const target = e.target as Node
    if (showMenu.value && !navMenuElem?.contains(target) && !navMenuTogglerElem?.contains(target)) {
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
