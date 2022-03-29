<template>
  <div
    contenteditable
    class="text-rfs-18xl leading-none"
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
