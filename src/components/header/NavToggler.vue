<template>
  <button :class="{ tracking: isLocaleZh }">
    {{ $t('header.start') }}
  </button>
</template>

<script setup>
import { isLocaleZh } from '@/i18n'
</script>
