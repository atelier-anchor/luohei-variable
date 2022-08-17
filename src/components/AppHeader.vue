<template>
  <header class="absolute z-10 w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
    <div
      class="font-optical-size-sm mx-auto flex max-w-screen-2xl text-sm"
      :class="[showNav ? 'justify-end' : 'justify-between']"
    >
      <template v-if="!showNav">
        <button v-if="isHome" class="tracking" @click="$emit('show-video')">观看动画</button>
        <a v-else href="#/"><span class="tracking">络黑 </span>LuoHei Variable</a>
      </template>
      <div class="flex gap-4">
        <nav class="absolute left-8 sm:static sm:block" :class="{ hidden: !showNav }">
          <ul class="flex gap-4">
            <li v-for="(item, name) in nav" :key="name" class="tracking">
              <a :href="`#/${name}`" :class="{ 'font-bold': currentPath.includes(name) }">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </nav>
        <button
          class="tracking sm:hidden"
          :class="{ 'font-bold': showNav }"
          @click="showNav = !showNav"
        >
          开始
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'

const showNav = ref(false)
const isHome = computed(() => props.currentPath === '' || props.currentPath === '#/')

window.addEventListener('resize', () => (showNav.value = false))

const props = defineProps({
  nav: Object,
  currentPath: String,
})
</script>
