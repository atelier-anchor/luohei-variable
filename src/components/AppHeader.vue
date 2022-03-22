<template>
  <header class="flex justify-between px-16 py-4">
    <button v-if="isHome">观看动画</button>
    <a v-else href="#/">络黑 LuoHei Variable</a>
    <nav class="hidden sm:block">
      <ul class="flex gap-4">
        <li v-for="(nav, name) in navs" :key="name" class="tracking-[0.2em]">
          <a :href="`#/${name}`" :class="{ 'font-bold': isActive(name) }">{{ nav.title }}</a>
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
  navs: Object,
  currentPath: String,
})
</script>
