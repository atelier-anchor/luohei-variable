;(function () {
  const timeInterval = 40
  const tailLength = 8
  const tailFactor = 0.2

  const chars =
    '一三上二今共十同国土夜字山工己平意我日明春月朝水永江海潮然王生的自花草警转连造酬锚随面风鹰'
  const useRandomChars = true

  const grid = document.getElementById('grid-container')
  const gridSize = 48

  let gridRows = 0
  let gridCols = 0

  const fillElements = (rows, cols) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let child = document.createElement('div')
        child.innerText = useRandomChars ? chars[Math.floor(Math.random() * chars.length)] : '字'
        child.classList.add('grid-item')
        child.style.fontVariationSettings = `'XWGT' 10, 'YWGT' 10`
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
  }

  window.addEventListener('load', updateGrid)
  window.addEventListener('resize', updateGrid)

  const range = (start, end, step = 1) =>
    [...Array((end - start) / step + 1).keys()].map((i) => start + i * step)

  // Delete `undefined` and remove duplicates
  const normalize = (array) => [...new Set(array.filter((e) => e))]

  const getUpdateArray = (row, col) => {
    const left = range(row, 0, -1).map((y) => `grid-item-${y}-${col}`)
    const right = range(row, gridRows - 1).map((y) => `grid-item-${y}-${col}`)
    const up = range(col, 0, -1).map((x) => `grid-item-${row}-${x}`)
    const down = range(col, gridCols - 1).map((x) => `grid-item-${row}-${x}`)

    const maxLen = Math.max(left.length, right.length, up.length, down.length)
    return [...Array(maxLen).keys()].map((i) => ({
      x: normalize([left[i], right[i]]),
      y: normalize([up[i], down[i]]),
    }))
  }

  const expScale = (n, k, start = 10, end = 100) =>
    [...Array(n).keys()].map((i) =>
      Math.round(((Math.exp(k * i) - 1) / (Math.exp(k * n - k) - 1)) * (end - start) + start)
    )

  const updateX = (id, val) => {
    const elem = document.getElementById(id)
    const res = elem.style.fontVariationSettings.replace(/"XWGT" \d+/, `"XWGT" ${val}`)
    elem.style.fontVariationSettings = res
  }

  const updateY = (id, val) => {
    const elem = document.getElementById(id)
    const res = elem.style.fontVariationSettings.replace(/"YWGT" \d+/, `"YWGT" ${val}`)
    elem.style.fontVariationSettings = res
  }

  const updateFont = async (array, time) => {
    const vfValues = expScale(tailLength, tailFactor).reverse()

    for (let i = 0; i < array.length + tailLength; i++) {
      for (let j = 0; j < tailLength; j++) {
        if (i > j - 1 && i < array.length + j) {
          array[i - j].x.forEach((id) => updateX(id, vfValues[j]))
          array[i - j].y.forEach((id) => updateY(id, vfValues[j]))
        }
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
      updateFont(getUpdateArray(row, col), timeInterval)
  }

  window.addEventListener('click', update)
  window.addEventListener('mousemove', update)
  window.addEventListener('touchstart', (e) => update(e.touches[0]))
})()
