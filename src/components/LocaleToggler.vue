<template>
  <button class="" @click="toggle">
    {{ { 'zh-hans': 'EN', 'zh-hant': '汉', en: '漢' }[locale] }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { isLocaleZhHant } from '../i18n'

const { locale, t } = useI18n()
const toggle = () => {
  locale.value = { 'zh-hans': 'en', 'zh-hant': 'zh-hans', en: 'zh-hant' }[locale.value]
  document.title = t('header.title')
  document.documentElement.lang = locale.value
  document.querySelector('body').style = isLocaleZhHant.value ? 'font-feature-settings: "ss01"' : ''
}
</script>
