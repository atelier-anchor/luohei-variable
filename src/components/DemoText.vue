<template>
  <div
    class="flex-1 overflow-auto break-words"
    :style="{
      fontSize: `${options.size}px`,
      fontVariationSettings: `'XWGT' ${options.xwgt}, 'YWGT' ${options.ywgt}`,
      writingMode: options.direction,
      paddingTop: options.direction === 'vertical-rl' ? '0.2em' : '0',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  options: Object, // size, xwgt, ywgt, direction
})
</script>
