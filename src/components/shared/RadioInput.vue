<template>
  <label :for="name" :class="{ 'font-bold': checked }">
    {{ abbr && !isLocaleZh && !checked ? label[0] : label }}
  </label>
  <input
    type="radio"
    :id="name"
    v-bind="{ name, checked, value }"
    v-model="modelValue"
    class="hidden appearance-none"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'

const checked = computed(() => modelValue.value === props.value)
const name = computed(() => `radio-${props.name}`)

const props = defineProps<{
  name: string
  label: string
  abbr?: boolean
  value: string
}>()

const modelValue = defineModel<string>()
</script>
