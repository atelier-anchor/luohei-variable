<template>
  <div :class="{ 'flex items-center gap-[var(--em)]': isLocaleZh }">
    <label class="w-18">{{ label }}</label>
    <div class="flex gap-[var(--em)]" :class="{ 'ml-4': !isLocaleZh }">
      <RadioInput
        v-for="option in options"
        :name="option.name"
        :label="$t(option.label)"
        :abbr="option.abbr"
        :value="option.value"
        v-model="modelValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isLocaleZh } from '@/i18n'
import RadioInput from '@/components/shared/RadioInput.vue'

defineProps<{
  label: string
  options: {
    name: string
    label: string
    abbr?: boolean
    value: string
  }[]
}>()

const modelValue = defineModel<string>()
</script>
