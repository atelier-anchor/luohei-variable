<template>
  <p>
    <template v-if="isLocaleZh">
      {{ $t('about.last-updated') }}<span class="cjk-latin-glue"></span>
    </template>
    <template v-else>
      {{ $t('about.last-updated') + ' ' }}
    </template>
    <time :datetime="date.toISOString()" v-html="cjkKern($d(date, 'long'))"></time>
  </p>
</template>

<script setup>
import { isLocaleZh } from '@/i18n'
import { cjkKern } from '@/utils'

const date = new Date(import.meta.env.VITE_BUILD_DATE)
</script>
