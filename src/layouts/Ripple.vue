<template>
  <div class="text-[2.5rem] sm:text-[3rem] leading-none text-light bg-white dark:bg-dark">
    <div class="select-none cursor-default">
      <div
        class="grid content-center justify-center items-center justify-items-center h-screen pt-14"
        :style="{ 'grid-template': gridTemplate }"
        ref="grid"
      >
        <div v-for="c in gridContent">{{ c }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const LUOHEI_CHARS =
  '上业个中书人今任位体作共击动十南印取变可叶同向品国图土夜大天始字对山工己平开录形态意我排文日明春月朝木本杜染样比毕水永江海潮点然王生田由画白的目空纛细织络置耳自色花草警计设转连造酬锚间随面风鹰黑'
const DEFAULT_CHAR = '字'

const grid = ref(null)
const gridSize = ref(0)
const gridRows = ref(0)
const gridCols = ref(0)
const gridTemplate = ref('')
const gridContent = reactive([])

const randomChar = (random = true) =>
  random ? LUOHEI_CHARS[Math.floor(Math.random() * LUOHEI_CHARS.length)] : DEFAULT_CHAR

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
