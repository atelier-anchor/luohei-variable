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
import { cjkKernValues, recipeText } from '@/components/recipe/recipe-text'

const text = computed(() =>
  props.options.textId === 'random'
    ? props.options.randomText
    : recipeText[fallbackLocale.value][props.options.textId]
)
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
