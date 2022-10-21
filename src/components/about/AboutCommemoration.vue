<template>
  <p>
    <span class="font-optical-size-lg text-rfs-lg" :class="{ 'tracking-[-0.01em]': !isLocaleZh }">
      {{ $t('about.commemoration') }}
    </span>
    <br />
    <a
      href="https://typemedia.org/noordzij/"
      target="_blank"
      class="font-optical-size-noordzij text-rfs-lg font-bold hover:font-normal"
      >Gerrit Noordzij</a
    >
    <br />
    (1931&ndash;2022)
  </p>
</template>

<script setup>
import { isLocaleZh } from '@/i18n'
</script>
