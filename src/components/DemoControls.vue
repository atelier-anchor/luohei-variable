<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 md:hidden">
      <button :class="{ 'font-bold': showFontOptions }" @click="toggleOptions">
        {{ $t('demo.font-options') }}
      </button>
      <button :class="{ 'font-bold': !showFontOptions }" @click="toggleOptions">
        {{ $t('demo.layout-options') }}
      </button>
    </div>
    <div class="md:block" :class="{ hidden: !showFontOptions }">
      <RangeInput :option="controls.xwgt" v-model.number="options.xwgt" />
      <RangeInput :option="controls.ywgt" v-model.number="options.ywgt" />
      <RadioInputGroup
        :label="$t('demo.weight')"
        :options="controls.weights"
        v-model="options.weight"
      />
      <RadioInputGroup
        :label="$t('demo.contrast')"
        :options="controls.contrasts"
        v-model="options.contrast"
      />
    </div>
    <div class="md:block" :class="{ hidden: showFontOptions }">
      <RangeInput :option="controls.size" v-model.number="options.size" />
      <RangeInput :option="controls.leading" v-model.number="options.leading" />
      <RadioInputGroup
        :label="$t('demo.direction')"
        :options="controls.directions"
        v-model="options.direction"
      />
      <RadioInputGroup
        :label="$t('demo.punct')"
        :options="controls.puncts"
        v-model="options.punct"
      />
    </div>
    <RadioInputGroup
      :label="$t('demo.text')"
      :options="controls.textIds"
      v-model="options.textId"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { randomChar } from '../utils'
import RadioInputGroup from '../components/RadioInputGroup.vue'
import RangeInput from '../components/RangeInput.vue'

const controls = reactive({
  xwgt: { name: 'xwgt', label: 'demo.x-axis', min: 100, max: 900 },
  ywgt: { name: 'ywgt', label: 'demo.y-axis', min: 100, max: 900 },
  weights: [
    { name: 'w-thin', label: 'demo.weights.thin', value: 'thin' },
    { name: 'w-light', label: 'demo.weights.light', value: 'light' },
    { name: 'w-medium', label: 'demo.weights.medium', value: 'medium' },
    { name: 'w-bold', label: 'demo.weights.bold', value: 'bold' },
    { name: 'w-heavy', label: 'demo.weights.heavy', value: 'heavy' },
  ],
  contrasts: [
    { name: 'c-none', label: 'demo.contrasts.none', value: 'none' },
    { name: 'c-normal', label: 'demo.contrasts.normal', value: 'normal' },
    { name: 'c-reverse', label: 'demo.contrasts.reverse', value: 'reverse' },
  ],
  // TODO: handle default values
  size: { name: 'size', label: 'demo.font-size', min: 16, max: 96, reset: true, default: 40 },
  leading: {
    name: 'leading',
    label: 'demo.leading',
    min: 1,
    max: 4,
    step: 0.05,
    reset: true,
    default: 1.3,
  },
  directions: [
    { name: 'direction-horizontal', label: 'demo.directions.horizontal', value: 'horizontal-tb' },
    { name: 'direction-vertical', label: 'demo.directions.vertical', value: 'vertical-rl' },
  ],
  puncts: [
    { name: 'punct-default', label: 'demo.puncts.default', value: 'default' },
    { name: 'punct-kaiming', label: 'demo.puncts.kaiming', value: 'kaiming' },
    { name: 'punct-full', label: 'demo.puncts.full', value: 'full' },
  ],
  textIds: [
    { name: 'id-a', label: 'demo.texts.a', value: 'a' },
    { name: 'id-b', label: 'demo.texts.b', value: 'b' },
    { name: 'id-c', label: 'demo.texts.c', value: 'c' },
    { name: 'id-random', label: 'demo.texts.random', value: 'random' },
  ],
})

const showFontOptions = ref(true)
const toggleOptions = () => (showFontOptions.value = !showFontOptions.value)

const insertQuotes = (s, quoteProb) => {
  if (Math.random() > quoteProb) return s
  const a = Math.floor(Math.random() * (s.length - 1))
  const b = Math.floor(Math.random() * (s.length - a)) + a + 1
  return `${s.slice(0, a)}「${s.slice(a, b)}」${s.slice(b)}`
}

const generateRandomPar = (sentenceNum, sentenceMinLen, sentenceMaxLen, quoteProb, puncts) =>
  [...Array(sentenceNum).keys()]
    .map(() => {
      const len = Math.floor(Math.random() * sentenceMaxLen) + sentenceMinLen
      const sentence = [...Array(len).keys()].map(() => randomChar()).join('')
      const punct = puncts[Math.floor(Math.random() * puncts.length)]
      return insertQuotes(sentence, quoteProb) + punct
    })
    .join('')
    .replace(/.$/g, '。')

const generateRandomText = (
  parNum = 3,
  sentenceNum = 5,
  sentenceMinLen = 5,
  sentenceMaxLen = 15,
  quoteProb = 0.2,
  puncts = '，，，，。。。！？'.split('') // Manually set the weights of different puncts
) =>
  [...Array(parNum).keys()].map(() =>
    generateRandomPar(sentenceNum, sentenceMinLen, sentenceMaxLen, quoteProb, puncts)
  )

onMounted(() => {
  const button = document.querySelector('label[for="radio-id-random"]')
  if (button)
    button.addEventListener('click', () => (props.options.randomText = generateRandomText()))
})

const props = defineProps({ options: Object })
</script>
