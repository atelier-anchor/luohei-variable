<template>
  <div class="flex gap-4">
    <nav class="absolute left-8 sm:static sm:block" :class="{ hidden: !showNav }">
      <ul class="flex gap-4">
        <li v-for="name in Object.keys(nav)" :class="{ tracking: isLocaleZh }">
          <a :href="`#/${name}`" :class="{ 'font-bold': currentPath.includes(name) }">
            {{ $t(`nav.${name}`) }}
          </a>
        </li>
      </ul>
    </nav>
    <button
      class="sm:hidden"
      :class="{ 'font-bold': showNav, tracking: isLocaleZh }"
      @click="$emit('toggle-nav')"
    >
      {{ $t('header.start') }}
    </button>
    <LocaleToggler />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { isLocaleZh } from '../i18n'
import LocaleToggler from './LocaleToggler.vue'

const nav = inject('nav')
const { currentPath } = inject('currentPath')

defineProps({
  showNav: Boolean,
})
</script>
