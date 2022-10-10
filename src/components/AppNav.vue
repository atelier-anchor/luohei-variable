<template>
  <nav>
    <ul class="flex gap-4">
      <li v-for="name in Object.keys(routes)" :class="{ tracking: isLocaleZh }">
        <a :href="`#/${name}`" :class="{ 'font-bold': currentPath.includes(name) }">
          {{ $t(`nav.${name}`) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { inject } from 'vue'
import { isLocaleZh } from '@/i18n'

const routes = inject('routes')
const { currentPath } = inject('currentPath')
</script>
