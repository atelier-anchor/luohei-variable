<template>
  <div class="flex items-center gap-4">
    <label
      :for="name"
      :data-reset="option.reset"
      :class="isLocaleZh ? 'w-18' : 'w-20'"
      @click="reset"
      v-html="cjkKern($t(option.label))"
    ></label>
    <input
      type="range"
      :id="name"
      :name="name"
      :min="option.min"
      :max="option.max"
      :step="option.step"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="isLocaleZh ? 'w-40' : 'w-36'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'
import { cjkKern } from '@/utils'
import type { RangeInputOption } from '@/components/recipe/recipe'

const name = computed(() => `range-${props.option.name}`)

const reset = () => {
  if (props.option.reset) emit('update:modelValue', props.option.default ?? props.option.min)
}

const props = defineProps<{
  option: RangeInputOption
  modelValue: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<style scoped>
input[type='range'] {
  @apply appearance-none bg-transparent;
  --size: 1rem;
  --border-width: 1.5px;
  --webkit-mt: calc((var(--size) - var(--border-width)) * -0.5);
  --moz-size: calc(var(--size) - var(--border-width) * 2);
}

/* The following rules for -webkit and -moz pesudo elements can't be merged. */

input[type='range']::-webkit-slider-thumb {
  @apply mt-[var(--webkit-mt)] h-[var(--size)] w-[var(--size)] appearance-none rounded-lg border-current bg-white shadow-none transition-colors dark:bg-dark;
  border: var(--border-width) solid currentColor;
}

input[type='range']::-moz-range-thumb {
  @apply h-[var(--moz-size)] w-[var(--moz-size)] rounded-lg border-current bg-white shadow-none transition-colors dark:bg-dark;
  border: var(--border-width) solid currentColor;
}

input[type='range']::-webkit-slider-runnable-track {
  @apply h-[var(--border-width)] appearance-none bg-current;
}

input[type='range']::-moz-range-track {
  @apply h-[var(--border-width)] bg-current;
}
</style>
