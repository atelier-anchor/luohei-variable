<template>
  <button class="" @click="toggle">
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const toggle = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  document.title = t('header.title')
}
const label = computed(() => (locale.value === 'zh' ? 'EN' : '汉'))
</script>
