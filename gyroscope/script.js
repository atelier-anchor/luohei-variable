const app = document.getElementById('app')
const toggler = document.getElementById('toggler')
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

let requestID
let audioContext
const handleMicrophone = async (e) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

    audioContext = new AudioContext()
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream)
    const analyserNode = audioContext.createAnalyser()
    mediaStreamAudioSourceNode.connect(analyserNode)

    const pcmData = new Float32Array(analyserNode.fftSize)
    const onFrame = () => {
      analyserNode.getFloatTimeDomainData(pcmData)
      const rms = Math.sqrt(pcmData.reduce((a, b) => a + b * b, 0)) / pcmData.length
      const val = Math.min(Math.round(10 + rms * 20000), 100)
      const varSettings = elemText.style.fontVariationSettings.replace(/"XWGT" \d+/, `"XWGT" ${val}`)
      elemText.style.fontVariationSettings = varSettings
      elemXwgt.innerText = val
      requestID = window.requestAnimationFrame(onFrame)
    }
    requestID = window.requestAnimationFrame(onFrame)
  }
}

const stopMicrophone = () => {
  window.cancelAnimationFrame(requestID)
  audioContext.close()
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

let togglerState = false
toggler.addEventListener('click', (e) => {
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
  toggler.classList.toggle('active')
})
