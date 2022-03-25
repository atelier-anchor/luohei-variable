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
          name="checkbox-show-value"
          id="checkbox-show-value"
          v-model="showValue"
          class="hidden appearance-none"
        />
        <label for="checkbox-show-value" :class="{ 'font-bold': showValue }">显示值</label>
        <button>声控变量一</button>
        <button>声控变量二</button>
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

const handleMousemove = (event) => {
  const x = event.clientX / window.innerWidth
  const y = (event.clientY - HEADER_HEIGHT) / (window.innerHeight - HEADER_HEIGHT)
  axes.xwgt = scale(x)
  axes.ywgt = scale(y)
}

const handleOrientation = (event) => {
  const beta = clamp(event.beta, -90, 90)
  const x = Math.cos((beta * Math.PI) / 180)
  const y = Math.cos((event.gamma * Math.PI) / 180)
  axes.xwgt = scale(x)
  axes.ywgt = scale(y)
}
</script>
