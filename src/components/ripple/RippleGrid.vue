<template>
  <div
    class="grid content-center items-center justify-center justify-items-center pt-14"
    :style="{ 'grid-template': grid.template, height: grid.height }"
    ref="gridContainer"
    @click="update($event)"
    @mousemove="update($event)"
    @touchmove.passive="update($event.touches[0])"
  >
    <div
      v-for="(item, idx) in grid.content"
      :id="gridItemId(idx)"
      :style="{ fontVariationSettings: initFontVariationSettings }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { fallbackLocale } from '@/i18n'
import { clamp, expScale, getRandomChar, HEADER_HEIGHT } from '@/utils'

interface Grid {
  size: number
  rows: number
  cols: number
  template: string
  height: string
  content: string[]
}

const gridContainer = ref<HTMLElement | null>(null)
const grid: Grid = reactive({ size: 0, rows: 0, cols: 0, template: '', height: '', content: [] })

const timeInterval = 40
const tailLength = 8
const tailFactor = 0.2
const initFontVariationSettings = '"XWGT" 100, "YWGT" 100'

const updateGridSize = () => {
  if (gridContainer.value) {
    const fontSize = window.getComputedStyle(gridContainer.value).fontSize
    grid.size = parseInt(fontSize.replace('px', '')) * 1.25
    grid.template = `repeat(auto-fit, ${grid.size}px) / repeat(auto-fit, ${grid.size}px)`
    grid.height = `${window.innerHeight}px`
  }
}

const updateGridNum = () => {
  grid.rows = Math.floor((window.innerHeight - HEADER_HEIGHT) / grid.size)
  grid.cols = Math.floor(window.innerWidth / grid.size)
}

const updateGridContent = (full = false) => {
  if (full) grid.content.length = 0
  const gridCellNum = grid.rows * grid.cols
  if (grid.content.length <= gridCellNum) {
    for (let i = grid.content.length; i < gridCellNum; i++) {
      grid.content.push(getRandomChar(fallbackLocale.value, true))
    }
  } else {
    grid.content.splice(gridCellNum)
  }
}

watch(
  () => fallbackLocale.value,
  () => updateGridContent(true)
)

const updateGrid = () => {
  updateGridSize()
  updateGridNum()
  updateGridContent()
}

const gridItemId = (idx: number) => {
  const row = Math.floor(idx / grid.cols)
  const col = idx % grid.cols
  return `grid-item-${row}-${col}`
}

const range = (start: number, end: number, step = 1) =>
  [...Array((end - start) / step + 1).keys()].map((i) => start + i * step)

// Delete `undefined` and remove duplicates
const normalize = <T>(array: T[]) => [...new Set(array.filter((e) => e))]

const getUpdatedArray = (row: number, col: number) => {
  const left = range(row, 0, -1).map((y) => `grid-item-${y}-${col}`)
  const right = range(row, grid.rows - 1).map((y) => `grid-item-${y}-${col}`)
  const up = range(col, 0, -1).map((x) => `grid-item-${row}-${x}`)
  const down = range(col, grid.cols - 1).map((x) => `grid-item-${row}-${x}`)
  const maxLen = Math.max(left.length, right.length, up.length, down.length)
  return [...Array(maxLen).keys()].map((i) => ({
    row: normalize([left[i], right[i]]),
    col: normalize([up[i], down[i]]),
  }))
}

const updateX = (id: string, val: number) => {
  const elem = document.getElementById(id)
  if (elem) {
    const res = elem.style.fontVariationSettings.replace(/"XWGT" \d+/, `"XWGT" ${val}`)
    elem.style.fontVariationSettings = res
  }
}

const updateY = (id: string, val: number) => {
  const elem = document.getElementById(id)
  if (elem) {
    const res = elem.style.fontVariationSettings.replace(/"YWGT" \d+/, `"YWGT" ${val}`)
    elem.style.fontVariationSettings = res
  }
}

const updateFont = async (array: { [x in 'row' | 'col']: string[] }[], time: number) => {
  const vfValues = expScale(tailLength, tailFactor).reverse()

  for (let i = 0; i < array.length + tailLength; i++) {
    for (let j = 0; j < tailLength; j++) {
      if (i > j - 1 && i < array.length + j) {
        array[i - j].row.forEach((id) => updateX(id, vfValues[j]))
        array[i - j].col.forEach((id) => updateY(id, vfValues[j]))
      }
    }

    await new Promise((r) => setTimeout(r, time))
  }
}

const update = (event: MouseEvent | Touch) => {
  const marginX = (window.innerWidth - grid.cols * grid.size) / 2
  const marginY = (window.innerHeight - grid.rows * grid.size + HEADER_HEIGHT) / 2
  const col = clamp(Math.floor((event.clientX - marginX) / grid.size), 0, grid.cols - 1)
  const row = clamp(Math.floor((event.clientY - marginY) / grid.size), 0, grid.rows - 1)
  const updatedArray = getUpdatedArray(row, col)
  updateFont(updatedArray, timeInterval)
}

const toggleTouchAction = () => document.querySelector('body')?.classList.toggle('touch-pinch-zoom')

onMounted(() => {
  updateGrid()
  toggleTouchAction()
  window.addEventListener('resize', () => {
    if (gridContainer.value) updateGrid()
  })
})

onUnmounted(() => {
  toggleTouchAction()
})
</script>
