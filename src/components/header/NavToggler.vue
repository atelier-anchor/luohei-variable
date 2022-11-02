<template>
  <button :class="{ tracking: isLocaleZh }">
    {{ $t('header.start') }}
  </button>
</template>

<script setup lang="ts">
import { isLocaleZh } from '@/i18n'
</script>
