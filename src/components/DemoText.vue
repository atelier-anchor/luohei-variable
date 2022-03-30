<template>
  <div
    class="flex-1 overflow-auto break-words"
    :style="{
      fontSize: `${fontSize}px`,
      fontVariationSettings: `'XWGT' ${xwgt}, 'YWGT' ${ywgt}`,
      writingMode: writingMode,
      paddingTop: writingMode === 'vertical-rl' ? '0.2em' : '0',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  fontSize: Number,
  xwgt: Number,
  ywgt: Number,
  writingMode: String,
})
</script>
