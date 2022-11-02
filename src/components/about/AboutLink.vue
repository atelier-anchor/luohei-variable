<template>
  <a :href="href" target="_blank" v-html="cjkKern(fixWrap(text))"></a>
</template>

<script setup lang="ts">
import { cjkKern, fixWrap } from '@/utils'

defineProps<{
  href: string
  text: string
}>()
</script>
