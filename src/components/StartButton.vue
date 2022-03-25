<template>
  <button @click="initialize" :class="{ invisible: initialized }">
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const initialized = ref(false)

const initialize = () => {
  // Request permission for iOS 13+ devices
  if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
  }
  window.addEventListener('deviceorientation', props.listener)
  initialized.value = true
}

const props = defineProps({
  listener: Function,
})
</script>

<style scoped>
@media (pointer: fine) {
  button {
    visibility: hidden;
  }
}
</style>
