<template>
  <header class="absolute bg-light dark:bg-dark w-full px-8 sm:px-16 py-4 z-10">
    <div
      class="flex text-sm font-optical-sm max-w-screen-2xl mx-auto"
      :class="[showNav ? 'justify-end' : 'justify-between']"
    >
      <template v-if="!showNav">
        <button v-if="isHome" class="tracking">观看动画</button>
        <a v-else href="#/"><span class="tracking">络黑 </span>LuoHei Variable</a>
      </template>
      <div class="flex gap-4">
        <nav class="absolute left-8 sm:static sm:block" :class="{ hidden: !showNav }">
          <ul class="flex gap-4">
            <li v-for="(item, name) in nav" :key="name" class="tracking">
              <a :href="`#/${name}`" :class="{ 'font-bold': isActive(name) }">{{ item.title }}</a>
            </li>
          </ul>
        </nav>
        <button class="sm:hidden tracking" :class="{ 'font-bold': showNav }" @click="toggleNav">
          开始
        </button>
        <a href="#/about" class="tracking" :class="{ 'font-bold': isActive('about') }">关于</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'

const isActive = (name) => props.currentPath.includes(name)
const isHome = computed(() => props.currentPath === '' || props.currentPath === '#/')

const showNav = ref(false)
const toggleNav = () => (showNav.value = !showNav.value)

window.addEventListener('resize', () => (showNav.value = false))

const props = defineProps({
  nav: Object,
  currentPath: String,
})
</script>
