<template>
  <button @click="toggleLocale">
    {{ { 'zh-hans': 'EN', 'zh-hant': '汉', en: '漢' }[locale] }}
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const toggleLocale = () => {
  locale.value = { 'zh-hans': 'en', 'zh-hant': 'zh-hans', en: 'zh-hant' }[locale.value] as string
  document.title = t('header.title')
  document.documentElement.lang = locale.value
  document
    .querySelector('body')
    ?.setAttribute('style', locale.value === 'zh-hant' ? 'font-feature-settings: "ss01"' : '')
}
</script>
