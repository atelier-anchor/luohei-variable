<template>
  <span>
    <label :for="name" :class="{ 'font-bold': checked }">
      {{ option.label }}
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
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const name = computed(() => `radio-${props.option.name}`)
const checked = computed(() => props.modelValue === props.option.value)

interface RadioInputOption {
  name: string
  label: string
  value: string
}

const props = defineProps<{
  option: RadioInputOption
  modelValue?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
