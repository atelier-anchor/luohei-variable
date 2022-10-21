<template>
  <p>
    {{ $t('about.last-updated') }}<span class="cjk-latin-glue"></span>
    <time :datetime="date.toISOString()" v-html="cjkKern($d(date, 'long'))"></time>
  </p>
</template>

<script setup>
import { cjkKern } from '@/utils'

const date = new Date(import.meta.env.VITE_BUILD_DATE)
</script>
