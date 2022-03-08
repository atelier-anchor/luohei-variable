const app = document.getElementById('app')
const statusElem = document.getElementById('status')

const elemText = document.getElementById('text')
const elemXwgt = document.getElementById('xwgt')
const elemYwgt = document.getElementById('ywgt')

const scale = (x, precision = 100) =>
  Math.round((100 - Math.cos((x * Math.PI) / 180) * 90) * precision) / precision

const handleOrientation = (e) => {
  const beta = Math.max(Math.min(e.beta, 90), -90)
  const xwgt = scale(beta)
  const ywgt = scale(e.gamma)
  const varSettings = `"XWGT" ${xwgt}, "YWGT" ${ywgt}`
  elemText.style.fontVariationSettings = varSettings
  elemXwgt.innerText = xwgt
  elemYwgt.innerText = ywgt
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
