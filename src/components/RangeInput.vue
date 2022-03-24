<template>
  <div class="flex items-center gap-4">
    <label :for="id" class="w-16">{{ label }}</label>
    <input
      type="range"
      :id="id"
      :value="modelValue"
      :min="min"
      :max="max"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-40"
    />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  min: Number,
  max: Number,
  modelValue: Number,
})
defineEmits(['update:modelValue'])
</script>

<style lang="postcss" scoped>
input[type='range'] {
  --size: 16px;
  --border-width: 2px;

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
