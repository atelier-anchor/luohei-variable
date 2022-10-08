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
  locale.value = { 'zh-hans': 'zh-hant', 'zh-hant': 'en', en: 'zh-hans' }[locale.value]
  document.title = t('header.title')
}
const label = computed(() => ({ 'zh-hans': '漢', 'zh-hant': 'EN', en: '汉' }[locale.value]))
</script>
