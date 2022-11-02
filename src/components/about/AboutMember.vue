<template>
  <span v-if="isLocaleZh" class="mr-2 sm:mr-4">{{ $t(`about.${title}`) }}</span>
  <template v-else>{{ $t(`about.${title}`) }}: </template>
  <a v-if="href" :href="href" target="_blank">{{ name[$i18n.locale] }}</a>
  <template v-else>{{ name[$i18n.locale] }}</template>
</template>

<script setup lang="ts">
import { isLocaleZh } from '@/i18n'

defineProps<{
  title: string
  name: { [x in string]: string }
  href?: string
}>()
</script>
