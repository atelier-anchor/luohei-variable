<template>
  <div class="flex items-center gap-4">
    <label
      :for="name"
      :data-reset="option.reset"
      :class="isLocaleZh ? 'w-18' : 'w-20'"
      @click="reset"
    >
      {{ $t(option.label) }}
    </label>
    <input
      type="range"
      :id="name"
      :name="name"
      :min="option.min"
      :max="option.max"
      :step="option.step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="isLocaleZh ? 'w-40' : 'w-36'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'

const name = computed(() => `range-${props.option.name}`)

const reset = () => {
  if (props.option.reset) emit('update:modelValue', props.option.default)
}

const props = defineProps({
  option: Object, // name, label, min, max, step?, reset?, default?
  modelValue: Number,
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input[type='range'] {
  --size: 16px;
  --border-width: 1.5px;

  @apply appearance-none;
  @apply bg-transparent;

  &::-webkit-slider-thumb {
    @apply appearance-none;
    @apply shadow-none;
    @apply bg-white;
    @apply dark:bg-dark;
    width: var(--size);
    height: var(--size);
    margin-top: calc((var(--size) - var(--border-width)) * -0.5);
    border: var(--border-width) solid currentColor;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    @apply shadow-none;
    @apply bg-white;
    @apply dark:bg-dark;
    width: calc(var(--size) - var(--border-width) * 2);
    height: calc(var(--size) - var(--border-width) * 2);
    border: var(--border-width) solid currentColor;
    border-radius: 50%;
  }

  &::-webkit-slider-runnable-track {
    @apply appearance-none;
    @apply bg-current;
    height: var(--border-width);
  }

  &::-moz-range-track {
    @apply bg-current;
    height: var(--border-width);
  }
}
</style>
