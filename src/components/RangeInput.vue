<template>
  <div class="flex items-center justify-between">
    <label :for="id">{{ label }}</label>
    <input type="range" :id="id" :name="id" class="w-48" />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
})
</script>

<style lang="postcss" scoped>
input[type='range'] {
  --size: 18px;
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
