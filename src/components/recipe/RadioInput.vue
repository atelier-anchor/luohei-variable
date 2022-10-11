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
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden appearance-none"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isLocaleZh } from '@/i18n'

const name = computed(() => `radio-${props.option.name}`)
const checked = computed(() => props.modelValue === props.option.value)

const props = defineProps({
  option: Object, // name, label, abbr?, value
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>
