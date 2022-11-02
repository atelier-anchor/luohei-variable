<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4 text-center">
    <h1 class="breathe-zh tracking text-rfs-8xl">
      {{ $t('header.name', '', { locale: fallbackLocale }) }}
    </h1>
    <h2 class="breathe-en px-8 text-rfs-4xl sm:px-16">
      <span
        v-for="(c, idx) in $t('header.name-en').split('')"
        :style="{ animationDelay: `${-idx}s` }"
        >{{ c }}</span
      >
    </h2>
  </div>
</template>

<script setup lang="ts">
import { fallbackLocale } from '@/i18n'
</script>

<style scoped>
.breathe-zh {
  animation: breathe-zh 12s steps(60) infinite;
}

.breathe-en > * {
  animation: breathe-en 12s steps(60) infinite;
}

/* Kerning for `Va` */
.breathe-en > :nth-child(8) {
  letter-spacing: -0.08em;
}

/* prettier-ignore */
@keyframes breathe-zh {
  0%, 100% { font-variation-settings: 'XWGT' 100, 'YWGT' 100; }
  25%      { font-variation-settings: 'XWGT' 100, 'YWGT' 400; }
  50%      { font-variation-settings: 'XWGT' 400, 'YWGT' 400; }
  75%      { font-variation-settings: 'XWGT' 400, 'YWGT' 100; }
}

/* prettier-ignore */
@keyframes breathe-en {
  0%, 100% { font-variation-settings: 'XWGT' 150, 'YWGT' 150; }
  25%      { font-variation-settings: 'XWGT' 150, 'YWGT' 600; }
  50%      { font-variation-settings: 'XWGT' 600, 'YWGT' 600; }
  75%      { font-variation-settings: 'XWGT' 600, 'YWGT' 150; }
}
</style>
