<template>
  <div class="flex gap-[var(--em)]">
    <RadioInput
      v-for="name in ['light', 'dark']"
      :name="`color-${name}`"
      :label="$t(`header.color-${name}`)"
      :value="name"
      v-model="color"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import RadioInput from '@/components/shared/RadioInput.vue'

const color = ref<'light' | 'dark'>('light')
const toggleDark = () => document.documentElement.classList.toggle('dark', color.value === 'dark')
onMounted(() => {
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkModePreference.matches) color.value = 'dark'
  darkModePreference.addEventListener('change', (e) => (color.value = e.matches ? 'dark' : 'light'))
  toggleDark()
})
watch(() => color.value, toggleDark)
</script>
