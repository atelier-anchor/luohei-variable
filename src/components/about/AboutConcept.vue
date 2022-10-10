<template>
  <p
    class="font-optical-size-lg hyphens-auto max-w-3xl text-rfs-lg"
    :class="{ 'leading-snug tracking-[-0.01em]': !isLocaleZh }"
    v-html="
      $t('about.concept', [
        cjkKern($t('about.concept-0')),
        link('https://tjdi.tongji.edu.cn/tags/projects/1833555', $t('about.concept-1')),
        cjkKern($t('about.concept-2')),
      ])
    "
  ></p>
</template>

<script setup>
import { isLocaleZh } from '@/i18n'
import { cjkKern } from '@/utils'

const link = (href, text) => `<a href='${href}' target='_blank'>${text}</a>`
</script>
