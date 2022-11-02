<template>
  <p>
    <span v-if="isLocaleZh" v-html="fixCjkGlue($t('about.last-updated'))"></span>
    <span v-else>{{ $t('about.last-updated') + ' ' }}</span>
    <time :datetime="date.toISOString()" v-html="cjkKern($d(date, 'long'))"></time>
  </p>
</template>

<script setup lang="ts">
import { isLocaleZh } from '@/i18n'
import { cjkKern } from '@/utils'

const date = new Date(import.meta.env.VITE_BUILD_DATE)
const fixCjkGlue = (s: string) =>
  s.slice(0, -1) + `<span class='cjk-latin-glue'>${s.slice(-1)}</span>`
</script>
