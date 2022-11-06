<template>
  <div :class="{ 'flex items-center gap-4': isLocaleZh }">
    <label class="w-18">{{ label }}</label>
    <div class="flex gap-4" :class="{ 'ml-4': !isLocaleZh }">
      <RadioInput
        v-for="option in options"
        :option="option"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isLocaleZh } from '@/i18n'
import RadioInput from '@/components/recipe/RadioInput.vue'
import type { RadioInputOption } from '@/components/recipe/recipe'

defineProps<{
  label: string
  options: RadioInputOption[]
  modelValue?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
