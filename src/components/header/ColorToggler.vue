<template>
  <div class="flex gap-2">
    <LocaleRadioInput v-for="option in colorOptions" :option="option" v-model="colorScheme" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleRadioInput from '@/components/header/LocaleRadioInput.vue'

const { t } = useI18n()
const colorOptions = computed(() => [
  { name: 'color-light', label: t('header.color-light'), value: 'light' },
  { name: 'color-dark', label: t('header.color-dark'), value: 'dark' },
])

const colorScheme = ref<'light' | 'dark'>('light')
const toggleDark = () =>
  document.documentElement.classList.toggle('dark', colorScheme.value === 'dark')
onMounted(() => {
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkModePreference.matches) colorScheme.value = 'dark'
  darkModePreference.addEventListener(
    'change',
    (e) => (colorScheme.value = e.matches ? 'dark' : 'light')
  )
  toggleDark()
})
watch(() => colorScheme.value, toggleDark)
</script>
