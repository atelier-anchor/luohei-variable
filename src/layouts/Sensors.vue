<template>
  <ColorContainer>
    <div
      class="flex flex-col items-center justify-center text-center h-screen"
      @mousemove="handleMousemove"
    >
      <div
        contenteditable
        class="text-[14rem] sm:text-[16rem] pt-8 sm:pt-0"
        :style="{ 'font-variation-settings': fontVariationSettings }"
      >
        永
      </div>
      <StartButton :listener="handleOrientation">点击这里开始…</StartButton>
      <div class="absolute top-20 left-8 sm:left-16">
        <div class="flex flex-col items-start">
          <button>显示值</button>
          <button>声控变量一</button>
          <button>声控变量二</button>
        </div>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import { ref } from 'vue'
import { clamp, scale } from '../utils';
import ColorContainer from '../components/ColorContainer.vue'
import StartButton from '../components/StartButton.vue'

const fontVariationSettings = ref('inherit')

const handleMousemove = (event) => {
  const x = event.clientX / window.innerWidth
  const y = event.clientY / window.innerHeight
  fontVariationSettings.value = `'XWGT' ${scale(x)}, 'YWGT' ${scale(1 - y)}`
}

const handleOrientation = (event) => {
  const beta = clamp(event.beta, -90, 90)
  const x = Math.cos((beta * Math.PI) / 180)
  const y = Math.cos((event.gamma * Math.PI) / 180)
  fontVariationSettings.value = `'XWGT' ${scale(x)}, 'YWGT' ${scale(y)}`
}
</script>
