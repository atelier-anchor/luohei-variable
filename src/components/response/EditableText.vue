<template>
  <div
    contenteditable
    class="-mb-16 max-w-full overflow-x-clip overflow-y-visible whitespace-nowrap text-rfs-18xl leading-tight"
    :style="{ 'font-variation-settings': `'XWGT' ${xwgt}, 'YWGT' ${ywgt}` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  xwgt: number
  ywgt: number
}>()
</script>
