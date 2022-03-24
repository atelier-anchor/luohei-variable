<template>
  <ColorContainer>
    <div class="flex flex-col items-center justify-center text-center h-screen">
      <div
        contenteditable
        class="text-[14rem] sm:text-[16rem] pt-8 sm:pt-0"
        :style="{ 'font-variation-settings': fontVariationSettings }"
      >
        永
      </div>
      <p>点击这里开始…</p>
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
import ColorContainer from '../components/ColorContainer.vue'

const fontVariationSettings = ref('inherit')

const scale = (x, min = 100, max = 900) => Math.round(x * (max - min) + min)

const handleMousemove = (e) => {
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight
  fontVariationSettings.value = `'XWGT' ${scale(x)}, 'YWGT' ${scale(1 - y)}`
}

window.addEventListener('mousemove', handleMousemove)
</script>
