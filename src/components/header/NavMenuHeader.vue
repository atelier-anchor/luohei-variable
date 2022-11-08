<template>
  <h3 class="font-bold" v-html="cjkKern(text)"></h3>
</template>

<script setup lang="ts">
import { cjkKern } from '@/utils'

defineProps<{
  text: string
}>()
</script>

<style scoped>
:deep(.p-close) {
  letter-spacing: 0.25em;
}
</style>
