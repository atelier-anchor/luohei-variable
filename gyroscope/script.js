const app = document.getElementById('app')
const statusElem = document.getElementById('status')

const elemText = document.getElementById('text')
const elemXwgt = document.getElementById('xwgt')
const elemYwgt = document.getElementById('ywgt')

const scale = (x, precision = 100) =>
  Math.round((100 - Math.cos((x * Math.PI) / 180) * 90) * precision) / precision

const update = (xwgt, ywgt) => {
  const varSettings = `"XWGT" ${xwgt}, "YWGT" ${ywgt}`
  elemText.style.fontVariationSettings = varSettings
  elemXwgt.innerText = xwgt
  elemYwgt.innerText = ywgt
}

const handleOrientation = (e) => {
  const beta = Math.max(Math.min(e.beta, 90), -90)
  update(scale(beta), scale(e.gamma))
}

const handleMousemove = (e) => {
  const x = Math.round((e.clientX / app.clientWidth) * 90 + 10)
  const y = Math.round((1 - e.clientY / app.clientHeight) * 90 + 10)
  update(x, y)
}

let initialized = false
app.addEventListener('click', (e) => {
  if (!initialized) {
    // Request permission for iOS 13+ devices
    if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
    }
    window.addEventListener('deviceorientation', handleOrientation)
    statusElem.style.visibility = 'hidden'
    initialized = true
  }
})

app.addEventListener('mousemove', handleMousemove)
