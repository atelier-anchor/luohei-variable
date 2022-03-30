<template>
  <div
    class="flex-1 overflow-auto break-words"
    :style="{
      fontSize: `${options.fontSize}px`,
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
import { cjkKern } from '../utils'

const cjkKernValues = {
  sm: { default: '0', kaiming: '0', full: '0.5em' },
  md: { default: '0', kaiming: '0.5em', full: '0.5em' },
  latin: { default: '0', kaiming: '0.125em', full: '0.125em' },
}

const cjkKernSm = computed(() => cjkKernValues.sm[props.options.punct])
const cjkKernMd = computed(() => cjkKernValues.md[props.options.punct])
const cjkLatinGlue = computed(() => cjkKernValues.latin[props.options.punct])

const props = defineProps({
  options: Object, // fontSize, xwgt, ywgt, direction, leading, punct
  text: Array,
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
