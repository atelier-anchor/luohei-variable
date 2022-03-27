<template>
  <ColorContainer class="px-8 sm:px-16">
    <div
      class="relative flex flex-col items-center justify-center gap-16 text-center h-screen max-w-screen-2xl mx-auto"
      @mousemove="handleMousemove"
    >
      <EditableText :xwgt="axes.xwgt" :ywgt="axes.ywgt" class="pt-8 sm:pt-0">永</EditableText>
      <div class="flex gap-16" :class="{ hidden: !showValue }">
        <div>XWGT = {{ axes.xwgt }}</div>
        <div>YWGT = {{ axes.ywgt }}</div>
      </div>
      <InitializeButton :listener="handleOrientation">点击这里开启方向感应…</InitializeButton>
      <div class="absolute top-20 left-0">
        <div class="flex flex-col items-start">
          <input
            type="checkbox"
            id="checkbox-show-value"
            name="checkbox-show-value"
            v-model="showValue"
            class="hidden appearance-none"
          />
          <label for="checkbox-show-value" :class="{ 'font-bold': showValue }">显示值</label>
          <button :class="{ 'font-bold': voiceControl.xwgt }" @click="toggleX">声控 X</button>
          <button :class="{ 'font-bold': voiceControl.ywgt }" @click="toggleY">声控 Y</button>
        </div>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import { onUnmounted, reactive, ref } from 'vue'
import { clamp, scale, HEADER_HEIGHT } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import EditableText from '../components/EditableText.vue'
import InitializeButton from '../components/InitializeButton.vue'

const axes = reactive({ xwgt: 250, ywgt: 500 })
const voiceControl = reactive({ xwgt: false, ywgt: false })
const showValue = ref(true)

const handleMousemove = (event) => {
  if (window.matchMedia('(pointer: fine)').matches) {
    if (!voiceControl.xwgt) {
      const x = event.clientX / window.innerWidth
      axes.xwgt = scale(x)
    }
    if (!voiceControl.ywgt) {
      const y = (event.clientY - HEADER_HEIGHT) / (window.innerHeight - HEADER_HEIGHT)
      axes.ywgt = scale(y)
    }
  }
}

const handleOrientation = (event) => {
  if (!voiceControl.xwgt) {
    const beta = clamp(event.beta, -90, 90)
    const x = 1 - Math.cos((beta * Math.PI) / 180)
    axes.xwgt = scale(x)
  }
  if (!voiceControl.ywgt) {
    const y = 1 - Math.cos((event.gamma * Math.PI) / 180)
    axes.ywgt = scale(y)
  }
}

let requestID = null
let audioContext = null

const rms = (data) => Math.sqrt(data.reduce((a, b) => a + b * b, 0) / data.length)
const normalize = (x, min, max) => (clamp(x, min, max) - min) / (max - min)

const handleMicrophone = async (e) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

    audioContext = new AudioContext()
    const mediaStreamAudioSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    mediaStreamAudioSource.connect(analyser)

    const data = new Float32Array(analyser.fftSize)
    const onFrame = () => {
      analyser.getFloatTimeDomainData(data)
      const value = scale(normalize(rms(data), 0, 0.25))
      if (voiceControl.xwgt) axes.xwgt = value
      if (voiceControl.ywgt) axes.ywgt = value
      requestID = window.requestAnimationFrame(onFrame)
    }
    requestID = window.requestAnimationFrame(onFrame)
  } else {
    console.warn('No microphone available.')
  }
}

const stopMicrophone = () => {
  if (audioContext && requestID) {
    audioContext.close().then(() => {
      window.cancelAnimationFrame(requestID)
      audioContext = null
      requestID = null
    })
  }
}

const toggleMicrophone = () => {
  if (voiceControl.xwgt || voiceControl.ywgt) {
    handleMicrophone()
  } else {
    stopMicrophone()
  }
  if (voiceControl.xwgt && voiceControl.ywgt) {
    window.removeEventListener('deviceorientation', handleOrientation)
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
  }
}

const toggleX = () => {
  voiceControl.xwgt = !voiceControl.xwgt
  toggleMicrophone()
}

const toggleY = () => {
  voiceControl.ywgt = !voiceControl.ywgt
  toggleMicrophone()
}

onUnmounted(() => {
  stopMicrophone()
  window.removeEventListener('deviceorientation', handleOrientation)
})
</script>
