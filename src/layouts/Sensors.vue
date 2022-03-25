<template>
  <ColorContainer>
    <div
      class="flex flex-col items-center justify-center gap-16 text-center h-screen"
      @mousemove="handleMousemove"
    >
      <div
        contenteditable
        class="text-[14rem] sm:text-[16rem] leading-none pt-8 sm:pt-0"
        :style="{ 'font-variation-settings': `'XWGT' ${axes.xwgt}, 'YWGT' ${axes.ywgt}` }"
      >
        永
      </div>
      <div class="flex gap-16" :class="{ hidden: !showValue }">
        <div>XWGT = {{ axes.xwgt }}</div>
        <div>YWGT = {{ axes.ywgt }}</div>
      </div>
      <InitializeButton :listener="handleOrientation">点击这里开始…</InitializeButton>
    </div>
    <div class="absolute top-20 left-8 sm:left-16">
      <div class="flex flex-col items-start">
        <input
          type="checkbox"
          id="checkbox-show-value"
          name="checkbox-show-value"
          v-model="showValue"
          class="hidden appearance-none"
        />
        <label for="checkbox-show-value" :class="{ 'font-bold': showValue }">显示值</label>
        <button :class="{ 'font-bold': voiceControlXwgt }" @click="toggleX">声控 X</button>
        <button :class="{ 'font-bold': voiceControlYwgt }" @click="toggleY">声控 Y</button>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { clamp, scale, HEADER_HEIGHT } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import InitializeButton from '../components/InitializeButton.vue'

const axes = reactive({ xwgt: 250, ywgt: 500 })
const showValue = ref(true)
const voiceControlXwgt = ref(false)
const voiceControlYwgt = ref(false)

const useMicrophone = () => voiceControlXwgt.value || voiceControlYwgt.value

const handleMousemove = (event) => {
  if (!useMicrophone()) {
    const x = event.clientX / window.innerWidth
    const y = (event.clientY - HEADER_HEIGHT) / (window.innerHeight - HEADER_HEIGHT)
    axes.xwgt = scale(x)
    axes.ywgt = scale(y)
  }
}

const handleOrientation = (event) => {
  const beta = clamp(event.beta, -90, 90)
  const x = Math.cos((beta * Math.PI) / 180)
  const y = Math.cos((event.gamma * Math.PI) / 180)
  axes.xwgt = scale(x)
  axes.ywgt = scale(y)
}

let requestID = null
let audioContext = null

const rms = (data) => Math.sqrt(data.reduce((a, b) => a + b * b, 0) / data.length)
const normalize = (x, min, max) => (clamp(x, min, max) - min) / (max - min)

const setXwgt = (analyser, data) => {
  if (voiceControlXwgt.value) {
    analyser.getFloatTimeDomainData(data)
    axes.xwgt = scale(normalize(rms(data), 0, 0.2))
  }
}

const setYwgt = (analyser, data) => {
  if (voiceControlYwgt.value) {
    analyser.getFloatFrequencyData(data)
    axes.ywgt = scale(normalize(rms(data), 40, 200))
  }
}

const handleMicrophone = async (e) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

    audioContext = new AudioContext()
    const mediaStreamAudioSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    mediaStreamAudioSource.connect(analyser)

    const dataX = new Float32Array(analyser.fftSize)
    const dataY = new Float32Array(analyser.fftSize)
    const onFrame = () => {
      setXwgt(analyser, dataX)
      setYwgt(analyser, dataY)
      requestID = window.requestAnimationFrame(onFrame)
    }
    requestID = window.requestAnimationFrame(onFrame)
  } else {
    console.warn('No microphone available.')
  }
}

const stopMicrophone = () => {
  if (audioContext && requestID) {
    audioContext.close()
    window.cancelAnimationFrame(requestID)
  }
}

const toggleMicrophone = () => {
  if (useMicrophone()) {
    window.removeEventListener('deviceorientation', handleOrientation)
    handleMicrophone()
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
    stopMicrophone()
  }
}

const toggleX = () => {
  voiceControlXwgt.value = !voiceControlXwgt.value
  toggleMicrophone()
}

const toggleY = () => {
  voiceControlYwgt.value = !voiceControlYwgt.value
  toggleMicrophone()
}
</script>
