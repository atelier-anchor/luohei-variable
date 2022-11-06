<template>
  <nav>
    <ul class="flex gap-4">
      <li v-for="name in Object.keys(routes)" :class="{ tracking: isLocaleZh }">
        <a
          :href="`#/${name}`"
          :class="{ 'font-bold': currentPath.includes(name) }"
          @click="$emit('click-link')"
        >
          {{ $t(`nav.${name}`) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { isLocaleZh } from '@/i18n'
import type { Router } from '@/App.vue'

const { currentPath, routes } = inject('router') as Router
defineEmits(['click-link'])
</script>
