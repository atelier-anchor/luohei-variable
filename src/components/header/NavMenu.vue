<template>
  <div class="border-2 border-light bg-white p-4 text-light dark:bg-dark dark:text-light">
    <div class="flex flex-col items-start gap-4">
      <div>
        <LocaleToggler />
      </div>
      <a href="https://atelier-anchor.com" target="_blank">{{
        $t('header.visit-atelier-anchor')
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import LocaleToggler from '@/components/header/LocaleToggler.vue'
</script>
