<template>
  <div :class="{ 'flex items-center gap-4': isLocaleZh }">
    <label class="w-16">{{ label }}</label>
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

<script setup>
import { isLocaleZh } from '@/i18n'
import RadioInput from '@/components/recipe/RadioInput.vue'

defineProps({
  label: String,
  options: Array,
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>
