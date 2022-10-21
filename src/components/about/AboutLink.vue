<template>
  <a :href="href" target="_blank" v-html="cjkKern(fixWrap(text))"></a>
</template>

<script setup>
import { cjkKern, fixWrap } from '@/utils'

defineProps({
  href: String,
  text: String,
})
</script>
