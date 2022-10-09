<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4 text-center">
    <h1 class="tracking text-rfs-8xl" :class="{ 'breathe-zh': active }">
      {{ isLocaleZhHant ? '絡黑' : '络黑' }}
    </h1>
    <h2 class="px-8 text-rfs-4xl sm:px-16">
      <span
        v-for="(c, idx) in 'LuoHei Variable'.split('')"
        :class="{ 'breathe-en': active }"
        :style="{ animationDelay: `${-idx}s` }"
        >{{ c }}</span
      >
    </h2>
  </div>
</template>

<script setup>
import { isLocaleZhHant } from '@/i18n'

defineProps({
  active: Boolean,
})
</script>

<style scoped>
.breathe-zh {
  animation: breathe-zh 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.breathe-en {
  animation: breathe-en 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
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
