<template>
  <button @click="initialize" class="pointer:hidden" :class="{ hidden: initialized }">
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
