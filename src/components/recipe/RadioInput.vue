<template>
  <div>
    <label :for="name" :class="{ 'font-bold': checked }">
      {{ option.abbr && !isLocaleZh && !checked ? $t(option.label)[0] : $t(option.label) }}
    </label>
    <input
      type="radio"
      :id="name"
      :name="name"
      :value="option.value"
      :checked="checked"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="hidden appearance-none"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'
import type { RadioInputOption } from '@/components/recipe/recipe'

const name = computed(() => `radio-${props.option.name}`)
const checked = computed(() => props.modelValue === props.option.value)

const props = defineProps<{
  option: RadioInputOption
  modelValue: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
