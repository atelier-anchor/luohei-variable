<template>
  <div>
    {{ $t('about.last-updated') }}
    <time :datetime="date.toISOString()">{{ $t('about.date', dateValues) }}</time>
  </div>
</template>

<script setup>
const date = new Date(import.meta.env.VITE_BUILD_DATE)
const dateValues = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  date: date.toLocaleString('en', { year: 'numeric', month: 'long', day: 'numeric' }),
}
</script>
