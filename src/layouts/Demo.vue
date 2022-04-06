<template>
  <ColorContainer class="px-8 sm:px-16">
    <div class="flex flex-col md:flex-row gap-8 h-screen max-w-screen-2xl pt-20 pb-6 mx-auto">
      <DemoControls :options="options" class="w-64" />
      <DemoText :options="options" class="flex-1" />
    </div>
  </ColorContainer>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { namedInstance, LUOHEI_WEIGHTS, LUOHEI_CONTRASTS } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import DemoControls from '../components/DemoControls.vue'
import DemoText from '../components/DemoText.vue'

const options = reactive({
  showFontOptions: true,
  xwgt: 0,
  ywgt: 0,
  weight: '',
  contrast: '',
  size: 40,
  leading: 1.3,
  direction: 'horizontal-tb',
  punct: 'default',
  textId: 'a',
  randomText: [],
})

const updateRangeInputs = () => {
  if (!options.weight) options.weight = 'medium'
  if (!options.contrast) options.contrast = 'normal'
  const instance = namedInstance(options.weight, options.contrast)
  options.xwgt = instance.xwgt
  options.ywgt = instance.ywgt
}

const updateRadioInputs = () => {
  for (const weight of LUOHEI_WEIGHTS) {
    for (const contrast of LUOHEI_CONTRASTS) {
      const instance = namedInstance(weight, contrast)
      if (instance.xwgt === options.xwgt && instance.ywgt === options.ywgt) {
        options.weight = weight
        options.contrast = contrast
        return
      }
    }
  }
  options.weight = ''
  options.contrast = ''
}

onMounted(() => {
  options.weight = LUOHEI_WEIGHTS[Math.floor(Math.random() * LUOHEI_WEIGHTS.length)]
  options.contrast = LUOHEI_CONTRASTS[Math.floor(Math.random() * LUOHEI_CONTRASTS.length)]
  updateRangeInputs()

  LUOHEI_WEIGHTS.forEach((weight) =>
    document.querySelector(`#radio-w-${weight}`).addEventListener('change', updateRangeInputs)
  )
  LUOHEI_CONTRASTS.forEach((contrast) => {
    document.querySelector(`#radio-c-${contrast}`).addEventListener('change', updateRangeInputs)
  })

  document.querySelector('#range-xwgt').addEventListener('input', updateRadioInputs)
  document.querySelector('#range-ywgt').addEventListener('input', updateRadioInputs)
})
</script>
