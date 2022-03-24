<template>
  <ColorContainer>
    <div class="text-[2.5rem] sm:text-[3rem] leading-none select-none cursor-default">
      <div
        class="grid content-center justify-center items-center justify-items-center h-screen pt-14"
        :style="{ 'grid-template': gridTemplate }"
        ref="grid"
      >
        <div v-for="c in gridContent">{{ c }}</div>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { randomChar } from '../utils';
import ColorContainer from '../components/ColorContainer.vue'

const grid = ref(null)
const gridSize = ref(0)
const gridRows = ref(0)
const gridCols = ref(0)
const gridTemplate = ref('')
const gridContent = reactive([])

const getGridSize = () => {
  const fontSize = window.getComputedStyle(grid.value).fontSize
  gridSize.value = parseInt(fontSize.replace('px', '')) * 1.25
  gridTemplate.value = `repeat(auto-fit, ${gridSize.value}px) / repeat(auto-fit, ${gridSize.value}px)`
}

const getGridNum = () => {
  const paddingTop = parseInt(window.getComputedStyle(grid.value).paddingTop.replace('px', ''))
  gridRows.value = Math.floor((window.innerHeight - paddingTop) / gridSize.value)
  gridCols.value = Math.floor(window.innerWidth / gridSize.value)
}

const updateGrid = () => {
  getGridSize()
  getGridNum()

  const gridContentLen = gridContent.length
  const gridNum = gridRows.value * gridCols.value

  if (gridContentLen <= gridNum) {
    for (let i = gridContentLen; i < gridNum; i++) gridContent.push(randomChar())
  } else {
    gridContent.splice(gridNum)
  }
}

const toggleTouchAction = () => document.querySelector('body').classList.toggle('touch-pinch-zoom')

onMounted(() => {
  updateGrid()
  toggleTouchAction()
  window.addEventListener('resize', () => {
    if (grid.value) updateGrid()
  })
})

onUnmounted(() => {
  toggleTouchAction()
})
</script>
