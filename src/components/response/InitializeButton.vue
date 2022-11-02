<template>
  <button v-show="!initialized" @click="initialize" class="pointer:hidden">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initialized = ref(false)

const initialize = () => {
  // Request permission for iOS 13+ devices
  if (DeviceMotionEvent && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
    ;(DeviceMotionEvent as any).requestPermission()
  }
  window.addEventListener('deviceorientation', props.listener)
  initialized.value = true
}

const props = defineProps<{
  listener: (event: DeviceOrientationEvent) => void
}>()
</script>
