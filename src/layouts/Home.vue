<template>
  <div class="absolute inset-0">
    <div class="flex flex-col items-center justify-center gap-4 text-center w-full h-full">
      <p class="text-[6rem] sm:text-[8rem] tracking-8 breathe">络黑</p>
      <p class="text-[3rem] sm:text-[4rem] px-8 sm:px-16">
        <span
          v-for="(c, idx) in 'LuoHei Variable'.split('')"
          class="breathe"
          :style="{ animationDelay: `${-idx}s` }"
          >{{ c }}</span
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.breathe {
  animation: breathe 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes breathe {
  0%,
  100% {
    font-variation-settings: 'XWGT' 200, 'YWGT' 200;
  }
  25% {
    font-variation-settings: 'XWGT' 200, 'YWGT' 900;
  }
  50% {
    font-variation-settings: 'XWGT' 900, 'YWGT' 900;
  }
  75% {
    font-variation-settings: 'XWGT' 900, 'YWGT' 200;
  }
}
</style>
