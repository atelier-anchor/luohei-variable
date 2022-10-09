<template>
  {{ isLocaleZh ? '（' : '(' }}<a :href="href" target="_blank"><slot></slot></a
  >{{ isLocaleZh ? '）' : ')' }}
</template>

<script setup>
import { isLocaleZh } from '@/i18n'

defineProps({
  href: String,
})
</script>
