<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const toggle = () => (locale.value = locale.value === 'zh' ? 'en' : 'zh')
const label = computed(() => (locale.value === 'zh' ? 'EN' : '汉'))
</script>

<template>
  <button class="" @click="toggle">
    {{ label }}
  </button>
</template>
