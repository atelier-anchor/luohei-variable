<template>
  <div class="flex gap-2">
    <LocaleRadioInput v-for="option in localeOptions" :option="option" v-model="locale" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LocaleRadioInput from '@/components/header/LocaleRadioInput.vue'

const { locale } = useI18n()
const localeOptions = [
  { name: 'locale-zh-hans', label: '汉', value: 'zh-hans' },
  { name: 'locale-zh-hant', label: '漢', value: 'zh-hant' },
  { name: 'locale-en', label: 'EN', value: 'en' },
]
</script>
