<template>
  <div class="flex gap-[var(--em)]">
    <RadioInput
      v-for="(label, name) of { 'zh-hans': '汉', 'zh-hant': '漢', en: 'EN' }"
      :name="`locale-${name}`"
      :label="label"
      :value="name"
      v-model="locale"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RadioInput from '@/components/shared/RadioInput.vue'

const { locale } = useI18n()
</script>
