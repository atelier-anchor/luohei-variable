<template>
  <p
    class="font-optical-size-lg hyphens-auto max-w-3xl text-rfs-lg"
    :class="{ 'leading-snug tracking-[-0.01em]': !isLocaleZh }"
    v-html="
      $t('about.concept', [
        cjkKern($t('about.concept-0')),
        link('https://tjdi.tongji.edu.cn/tags/projects/1833555', $t('about.concept-1')),
        fixWrap(cjkKern($t('about.concept-2'))),
      ])
    "
  ></p>
</template>

<script setup>
import { computed } from 'vue'
import { fallbackLocale, isLocaleZh } from '@/i18n'
import { cjkKern, fixWrap } from '@/utils'

const link = (href, text) => `<a href='${href}' target='_blank'>${text}</a>`
const spacing = computed(() =>
  fallbackLocale.value === 'zh-hans'
    ? { comma: '0.25em' }
    : {
        comma: '0.125em',
        'before-comma': '0.125em',
        'before-fullstop': '0.25em',
        'close-comma': '0.125em',
      }
)
</script>

<style scoped>
:deep(.p-close),
:deep(.p-before-open) {
  letter-spacing: 0.25em;
}

:deep(.p-comma) {
  letter-spacing: v-bind('spacing.comma');
}
:deep(.p-before-comma) {
  letter-spacing: v-bind('spacing["before-comma"]');
}
:deep(.p-before-fullstop) {
  letter-spacing: v-bind('spacing["before-fullstop"]');
}
:deep(.p-close-before-comma) {
  letter-spacing: v-bind('spacing["close-comma"]');
}
</style>
