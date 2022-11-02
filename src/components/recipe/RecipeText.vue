<template>
  <div
    class="overflow-auto break-words pr-4"
    :class="[
      options.direction === 'vertical-rl' ? 'pt-[0.2em]' : '',
      options.textId === 'random' ? 'indent-[1em] lg:indent-[2em]' : '',
    ]"
    :style="{
      fontSize: `${options.size}px`,
      fontVariationSettings: `'XWGT' ${options.xwgt}, 'YWGT' ${options.ywgt}`,
      writingMode: options.direction,
      lineHeight: options.leading,
    }"
  >
    <p v-for="line in text(options)" v-html="cjkKern(line)"></p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fallbackLocale } from '@/i18n'
import { cjkKern } from '@/utils'
import { glueValues, kerningValues, recipeText, spacingValues } from '@/components/recipe/recipe'
import type { RecipeOption } from '@/components/recipe/recipe'

const text = ({ textId, randomText }: RecipeOption) =>
  textId === 'random' ? randomText : recipeText[fallbackLocale.value][textId]

const spacing = computed(() => {
  const data = spacingValues(props.options.direction === 'horizontal-tb')
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value[fallbackLocale.value][props.options.punct] ?? ['0em', '0em'],
    ])
  )
})

const kerning = computed(() => {
  const data = kerningValues(props.options.direction === 'horizontal-tb')
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value[fallbackLocale.value][props.options.punct],
    ])
  )
})

const glue = computed(() => {
  const data = glueValues(props.options.direction === 'horizontal-tb')
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value[props.options.punct] ?? '0em'])
  )
})

const props = defineProps<{
  options: RecipeOption
}>()
</script>

<style scoped>
:deep([class^='p-']),
:deep([class$='-glue']) {
  @apply transition-[letter-spacing];
}

/* Comma */
:deep(.p-before-comma),
:deep(.p-close-before-comma) {
  letter-spacing: v-bind('spacing.comma[0]');
}
:deep(.p-comma),
:deep(.p-comma-before-close + .p-close) {
  letter-spacing: v-bind('spacing.comma[1]');
}

/* Full stop */
:deep(.p-before-fullstop),
:deep(.p-close-before-fullstop) {
  letter-spacing: v-bind('spacing.fullstop[0]');
}
:deep(.p-fullstop),
:deep(.p-fullstop-before-close + .p-close) {
  letter-spacing: v-bind('spacing.fullstop[1]');
}

/* Colon and semicolon */
:deep(.p-before-colon),
:deep(.p-close-before-colon) {
  letter-spacing: v-bind('spacing.colon[0]');
}
:deep(.p-colon) {
  letter-spacing: v-bind('spacing.colon[1]');
}
:deep(.p-colon-before-close + .p-close) {
  letter-spacing: v-bind('kerning["colon-close"]');
}

/* Dividing marks (exclamation mark and question mark) */
:deep(.p-before-divide),
:deep(.p-close-before-divide) {
  letter-spacing: v-bind('spacing.divide[0]');
}
:deep(.p-divide) {
  letter-spacing: v-bind('spacing.divide[1]');
}
:deep(.p-divide-before-close + .p-close) {
  letter-spacing: v-bind('kerning["divide-close"]');
}

/* Opening brackets */
:deep(.p-before-open) {
  letter-spacing: v-bind('spacing.open[0]');
}
:deep(.p-open) {
  letter-spacing: v-bind('spacing.open[1]');
}

/* Closing brackets */
:deep(.p-close) {
  letter-spacing: v-bind('spacing.close[1]');
}

/* CJK and latin/digits glue */
:deep(.cjk-latin-glue) {
  letter-spacing: v-bind('glue.cjkLatin');
}
:deep(.latin-cjk-glue) {
  letter-spacing: v-bind('glue.latinCjk');
}
:deep(.p-comma.cjk-latin-glue),
:deep(.p-comma-before-close + .p-close.cjk-latin-glue) {
  letter-spacing: max(v-bind('spacing.comma[1]'), v-bind('glue.cjkLatin'));
}
:deep(.p-colon.cjk-latin-glue),
:deep(.p-colon-before-close + .p-close.cjk-latin-glue) {
  letter-spacing: max(v-bind('spacing.colon[1]'), v-bind('glue.cjkLatin'));
}
:deep(:not(.p-fullstop-before-close, .p-divide-before-close) + .p-close.cjk-latin-glue),
:deep(.p-close-before-close + .p-close.cjk-latin-glue) {
  letter-spacing: max(v-bind('spacing.close[1]'), v-bind('glue.cjkLatin'));
}
:deep(.p-before-open.latin-cjk-glue) {
  letter-spacing: max(v-bind('spacing.open[0]'), v-bind('glue.latinCjk'));
}
</style>
