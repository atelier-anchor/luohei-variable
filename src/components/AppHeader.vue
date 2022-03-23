<template>
  <header class="fixed w-full px-8 sm:px-16 py-4 z-10">
    <div class="flex justify-between text-sm font-optical-sm">
      <button v-if="isHome" class="tracking">观看动画</button>
      <a v-else href="#/"><span class="tracking">络黑</span> LuoHei Variable</a>
      <button class="sm:hidden tracking" @click="toggleNav()">页面</button>
      <nav
        class="absolute top-4 left-8 bg-light dark:bg-dark sm:static sm:block sm:bg-transparent"
        :class="{ hidden: !showNav }"
      >
        <ul class="flex gap-4">
          <li v-for="(item, name) in nav" :key="name" class="tracking">
            <a :href="`#/${name}`" :class="{ 'font-bold': isActive(name) }">{{ item.title }}</a>
          </li>
        </ul>
      </nav>
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
