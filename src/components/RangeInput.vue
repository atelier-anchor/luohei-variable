<template>
  <div class="flex items-center gap-4">
    <label :for="name" class="w-16">{{ option.label }}</label>
    <input
      type="range"
      :id="name"
      :name="name"
      :min="option.min"
      :max="option.max"
      :step="option.step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-40"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const name = computed(() => `range-${props.option.name}`)

const props = defineProps({
  option: Object, // name, label, min, max, step?
  modelValue: Number,
})
defineEmits(['update:modelValue'])
</script>

<style lang="postcss" scoped>
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
