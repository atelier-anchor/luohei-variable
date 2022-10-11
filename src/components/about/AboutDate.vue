<template>
  <div>
    {{ $t('about.last-updated') }}
    <time :datetime="date.toISOString()">{{ addSpace($d(date, 'long')) }}</time>
  </div>
</template>

<script setup>
const date = new Date(import.meta.env.VITE_BUILD_DATE)
const addSpace = (s) => s.replace(/([\u4e00-\u9fff])/g, ' $1 ').trim()
</script>
