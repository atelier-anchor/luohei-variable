<template>
  <ColorContainer class="px-8 sm:px-16">
    <div
      class="relative mx-auto flex h-screen max-w-screen-2xl flex-col items-center justify-center gap-16 pt-14 text-center"
    >
      <EditableText :xwgt="axes.xwgt" :ywgt="axes.ywgt">永</EditableText>
      <div v-show="showValues" class="flex gap-8">
        <div>XWGT = {{ axes.xwgt }}</div>
        <div>YWGT = {{ axes.ywgt }}</div>
      </div>
      <InitializeButton :listener="handleOrientation">
        {{ $t('response.enable-orientation') }}
      </InitializeButton>
      <div class="absolute top-20 left-0">
        <div class="flex flex-col items-start">
          <input
            type="checkbox"
            id="checkbox-show-values"
            name="checkbox-show-values"
            v-model="showValues"
            class="hidden appearance-none"
          />
          <label for="checkbox-show-values" :class="{ 'font-bold': showValues }">
            {{ $t('response.show-values') }}
          </label>
          <button
            v-html="cjkKern($t('response.voice-control-x'))"
            :class="{ 'font-bold': voiceControl.xwgt }"
            @click="toggleX"
          ></button>
          <button
            v-html="cjkKern($t('response.voice-control-y'))"
            :class="{ 'font-bold': voiceControl.ywgt }"
            @click="toggleY"
          ></button>
        </div>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { cjkKern, clamp, scale, HEADER_HEIGHT } from '@/utils'
import ColorContainer from '@/components/ColorContainer.vue'
import EditableText from '@/components/response/EditableText.vue'
import InitializeButton from '@/components/response/InitializeButton.vue'

const axes = reactive({ xwgt: 250, ywgt: 500 })
const voiceControl = reactive({ xwgt: false, ywgt: false })
const showValues = ref(true)

const handleMousemove = (event: MouseEvent) => {
  if (window.matchMedia('(pointer: fine)').matches) {
    if (!voiceControl.xwgt) {
      const x = event.clientX / window.innerWidth
      axes.ywgt = scale(x)
    }
    if (!voiceControl.ywgt) {
      const y = (event.clientY - HEADER_HEIGHT) / (window.innerHeight - HEADER_HEIGHT)
      axes.xwgt = scale(y)
    }
  }
}

onMounted(() => document.querySelector('main')?.addEventListener('mousemove', handleMousemove))

const handleOrientation = (event: DeviceOrientationEvent) => {
  if (!voiceControl.xwgt) {
    const beta = clamp(event.beta ?? 0, -90, 90)
    const x = 1 - Math.cos((beta * Math.PI) / 180)
    axes.xwgt = scale(x)
  }
  if (!voiceControl.ywgt) {
    const y = 1 - Math.cos(((event.gamma ?? 0) * Math.PI) / 180)
    axes.ywgt = scale(y)
  }
}

let requestID: number | null = null
let audioContext: AudioContext | null = null

const rms = (data: Float32Array) => Math.sqrt(data.reduce((a, b) => a + b * b, 0) / data.length)
const normalize = (x: number, min: number, max: number) => (clamp(x, min, max) - min) / (max - min)

const handleMicrophone = async () => {
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
  audioContext?.close().then(() => {
    if (requestID) window.cancelAnimationFrame(requestID)
    audioContext = null
    requestID = null
  })
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
