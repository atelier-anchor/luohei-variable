<template>
  <label :for="name" :class="{ 'font-bold': checked }">
    {{ abbr && !isLocaleZh && !checked ? label[0] : label }}
  </label>
  <input
    type="radio"
    :id="name"
    :name="name"
    :value="value"
    :checked="checked"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="hidden appearance-none"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'

const checked = computed(() => props.modelValue === props.value)
const name = computed(() => `radio-${props.name}`)

const props = defineProps<{
  name: string
  label: string
  abbr?: boolean
  value: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
