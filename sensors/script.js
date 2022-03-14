const app = document.getElementById('app')
const togglerElem = document.getElementById('toggler')
const statusElem = document.getElementById('status')
const textElem = document.getElementById('text')

const scale = (x, precision = 100) =>
  Math.round((100 - Math.cos((x * Math.PI) / 180) * 90) * precision) / precision

const update = (x, y) => {
  const varSettings = `"XWGT" ${x}, "YWGT" ${y}`
  textElem.style.fontVariationSettings = varSettings
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

let requestID = null
let audioContext = null
const handleMicrophone = async (e) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

    audioContext = new AudioContext()
    const mediaStreamAudioSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    mediaStreamAudioSource.connect(analyser)

    const data = new Float32Array(analyser.fftSize)
    const onFrame = () => {
      analyser.getFloatTimeDomainData(data)
      const rms = Math.sqrt(data.reduce((a, b) => a + b * b, 0) / data.length)
      const x = Math.min(Math.round(10 + rms * 200), 100)
      textElem.style.fontVariationSettings = `"XWGT" ${x}, "YWGT" ${10}`
      requestID = window.requestAnimationFrame(onFrame)
    }
    requestID = window.requestAnimationFrame(onFrame)
  } else {
    console.warn('No microphone available.')
  }
}

const stopMicrophone = () => {
  if (audioContext && requestID) {
    audioContext.close()
    window.cancelAnimationFrame(requestID)
  }
}

let initialized = false
statusElem.addEventListener('click', (e) => {
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

let togglerState = false
togglerElem.addEventListener('click', () => {
  if (togglerState) {
    window.addEventListener('deviceorientation', handleOrientation)
    app.addEventListener('mousemove', handleMousemove)
    stopMicrophone()
  } else {
    window.removeEventListener('deviceorientation', handleOrientation)
    app.removeEventListener('mousemove', handleMousemove)
    handleMicrophone()
  }
  togglerState = !togglerState
  togglerElem.classList.toggle('active')
})
