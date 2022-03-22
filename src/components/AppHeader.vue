<template>
  <header class="relative flex justify-between text-sm font-optical-sm px-8 sm:px-16 py-4 z-10">
    <button v-if="isHome" class="tracking-1">观看动画</button>
    <a v-else href="#/"><span class="tracking-1">络黑</span> LuoHei Variable</a>
    <nav class="hidden sm:block">
      <ul class="flex gap-4">
        <li v-for="(item, name) in nav" :key="name" class="tracking-1">
          <a :href="`#/${name}`" :class="{ 'font-bold': isActive(name) }">{{ item.title }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const isActive = (name) => props.currentPath.includes(name)
const isHome = computed(() => props.currentPath === '' || props.currentPath === '#/')

const props = defineProps({
  nav: Object,
  currentPath: String,
})
</script>
