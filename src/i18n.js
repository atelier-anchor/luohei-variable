import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import zhHans from '@/locales/zh-hans.json'
import zhHant from '@/locales/zh-hant.json'
import en from '@/locales/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-hans',
  messages: {
    'zh-hans': zhHans,
    'zh-hant': zhHant,
    en: en,
  },
  datetimeFormats: {
    'zh-hans': { long: { year: 'numeric', month: 'long', day: 'numeric' } },
    'zh-hant': { long: { year: 'numeric', month: 'long', day: 'numeric' } },
    en: { long: { year: 'numeric', month: 'long', day: 'numeric' } },
  },
})

export const isLocaleZh = computed(() => i18n.global.locale.value.startsWith('zh'))
export const fallbackLocale = computed(() =>
  i18n.global.locale.value === 'zh-hant' ? 'zh-hant' : 'zh-hans'
)
