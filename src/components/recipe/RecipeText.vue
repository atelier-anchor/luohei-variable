<template>
  <div
    class="overflow-auto break-words"
    :style="{
      fontSize: `${options.size}px`,
      fontVariationSettings: `'XWGT' ${options.xwgt}, 'YWGT' ${options.ywgt}`,
      writingMode: options.direction,
      paddingTop: options.direction === 'vertical-rl' ? '0.2em' : '0',
      lineHeight: options.leading,
    }"
  >
    <p v-for="line in text" v-html="cjkKern(line)"></p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fallbackLocale } from '@/i18n'
import { cjkKern } from '@/utils'

const texts = {
  'zh-hans': {
    a: [
      '天上取样人间织，染作江南春水色。',
      '春江潮水连海平，海上明月共潮生。',
      'Ad astra abyssosque!',
      // '天，上。取！样「人」间（织）染作',
      // '字字字字字字字，字字。字字字',
      // '字字字字字字字「字字」字（字）字',
      // '字字，「字字」，字字字',
      // '字字。「字字」！字字字',
      // '字字，」字字字',
      // '字字。」字字字',
      // '字字「字」「字」字」，字',
      // '字字「字」（字）字）。字',
    ],
    b: ['面向动态图形的中文可变字体「络黑」（LuoHei Variable），设计于2020\u{2013}2022年间。'],
    c: ['个风我酬意警鹰纛\u{30EDD}', 'Fox nymphs grab quick-jived waltz.', '2.718281828459…'],
  },
  'zh-hant': {
    a: [
      '天上取樣人間織，染作江南春水色。',
      '春江潮水連海平，海上明月共潮生。',
      'Ad astra abyssosque!',
    ],
    b: ['面向動態圖形的中文可變字型「絡黑」（LuoHei Variable），設計於2020\u{2013}2022年間。'],
    c: ['个東我意酬書鬱鷹\u{30EDE}', 'Fox nymphs grab quick-jived waltz.', '2.718281828459…'],
  },
}

const text = computed(() =>
  props.options.textId === 'random'
    ? props.options.randomText
    : texts[fallbackLocale.value][props.options.textId]
)

const cjkKernValues = {
  sm: { default: '0', kaiming: '0', full: '0.5em' },
  md: { default: '0', kaiming: '0.5em', full: '0.5em' },
  latin: { default: '0', kaiming: '0.125em', full: '0.125em' },
}

const cjkKernSm = computed(() => cjkKernValues.sm[props.options.punct])
const cjkKernMd = computed(() => cjkKernValues.md[props.options.punct])
const cjkLatinGlue = computed(() => cjkKernValues.latin[props.options.punct])

const props = defineProps({
  options: Object,
})
</script>

<style scoped>
:deep([class^='cjk-kern']) {
  @apply transition-[letter-spacing];
}

:deep(.cjk-kern-sm) {
  letter-spacing: v-bind(cjkKernSm);
}

:deep(.cjk-kern-md) {
  letter-spacing: v-bind(cjkKernMd);
}

:deep(.cjk-latin-glue) {
  margin-inline-end: v-bind(cjkLatinGlue);
}
</style>
