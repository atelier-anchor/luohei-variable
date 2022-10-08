import { computed } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import zhHans from './locales/zh-hans.json'
import zhHant from './locales/zh-hant.json'
import en from './locales/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-hans',
  messages: {
    'zh-hans': zhHans,
    'zh-hant': zhHant,
    en: en,
  },
})

export const isLocaleZh = computed(() => useI18n().locale.value.startsWith('zh'))
