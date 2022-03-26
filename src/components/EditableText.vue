<template>
  <div
    contenteditable
    class="text-[14rem] sm:text-[16rem] leading-none"
    :style="{ 'font-variation-settings': `'XWGT' ${xwgt}, 'YWGT' ${ywgt}` }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  xwgt: Number,
  ywgt: Number,
})
</script>

<style scoped>
[contenteditable]:focus {
  @apply outline-light;
}
</style>
