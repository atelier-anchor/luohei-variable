const grid = document.getElementById('grid-container')
const gridSize = 48
let gridRows = 0
let gridCols = 0

const chars =
  '一三上二今共十同国土夜字山工己平意我日明春月朝水永江海潮然王生的自花草警转连造酬锚随面风鹰'

const fillElements = (rows, cols) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let child = document.createElement('div')
      // child.innerText = chars[Math.floor(Math.random() * chars.length)]
      child.innerText = '字'
      child.classList.add('grid-item')
      child.id = `grid-item-${row}-${col}`
      grid.appendChild(child)
    }
  }
}

const updateGrid = () => {
  grid.innerHTML = ''
  const gridStyle = window.getComputedStyle(grid)
  gridRows = gridStyle.getPropertyValue('grid-template-rows').split(' ').length
  gridCols = gridStyle.getPropertyValue('grid-template-columns').split(' ').length
  fillElements(gridRows, gridCols)
  // console.log(gridRows, gridCols)
}

window.addEventListener('load', updateGrid)
window.addEventListener('resize', updateGrid)

const range = (start, end, step = 1) =>
  [...Array((end - start) / step + 1).keys()].map((i) => start + i * step)

const getUpdateArray = (row, col) => {
  const arrayLeft = range(row - 1, 0, -1).map((y) => `grid-item-${y}-${col}`)
  const arrayRight = range(row + 1, gridRows - 1).map((y) => `grid-item-${y}-${col}`)
  const arrayTop = range(col - 1, 0, -1).map((x) => `grid-item-${row}-${x}`)
  const arrayBottom = range(col + 1, gridCols - 1).map((x) => `grid-item-${row}-${x}`)

  const maxLen = Math.max(arrayLeft.length, arrayRight.length, arrayTop.length, arrayBottom.length)
  let res = [[`grid-item-${row}-${col}`]]
  for (let i = 0; i < maxLen; i++) {
    res.push([arrayLeft[i], arrayRight[i], arrayTop[i], arrayBottom[i]].filter((e) => e))
  }

  return res
}

const expScale = (n, k, start = 10, end = 100) =>
  [...Array(n).keys()].map((i) =>
    Math.round(((Math.exp(k * i) - 1) / (Math.exp(k * n - k) - 1)) * (end - start) + start)
  )

const updateFont = async (array, time) => {
  const tailLength = 4
  const xwgtValues = expScale(tailLength, 0.6).reverse()

  for (let i = 0; i < array.length + tailLength; i++) {
    for (let j = 0; j < tailLength; j++) {
      if (i > j - 1 && i < array.length + j)
        array[i - j].forEach((id) => {
          const elem = document.getElementById(id)
          elem.style.fontVariationSettings = `'XWGT' ${xwgtValues[j]}`
        })
    }

    await new Promise((r) => setTimeout(r, time))
  }
}

const update = (event) => {
  const marginY = (window.innerHeight - gridRows * gridSize) / 2
  const marginX = (window.innerWidth - gridCols * gridSize) / 2

  const row = Math.floor((event.clientY - marginY) / gridSize)
  const col = Math.floor((event.clientX - marginX) / gridSize)

  if (row >= 0 && row < gridRows && col >= 0 && col < gridCols)
    updateFont(getUpdateArray(row, col), 50)
}

window.addEventListener('click', update)
window.addEventListener('mousemove', update)
window.addEventListener('touchmove', (e) => update(e.touches[0]))
