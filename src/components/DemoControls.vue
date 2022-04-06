<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 md:hidden">
      <button :class="{ 'font-bold': showFontOptions }" @click="toggleOptions">字体设置</button>
      <button :class="{ 'font-bold': !showFontOptions }" @click="toggleOptions">排版设置</button>
    </div>
    <div class="md:block" :class="{ hidden: !showFontOptions }">
      <RangeInput :option="controls.xwgt" v-model.number="options.xwgt" />
      <RangeInput :option="controls.ywgt" v-model.number="options.ywgt" />
      <RadioInputGroup label="字重" :options="controls.weights" v-model="options.weight" />
      <RadioInputGroup label="对比" :options="controls.contrasts" v-model="options.contrast" />
    </div>
    <div class="md:block" :class="{ hidden: showFontOptions }">
      <RangeInput :option="controls.size" v-model.number="options.size" />
      <RangeInput :option="controls.leading" v-model.number="options.leading" />
      <RadioInputGroup label="方向" :options="controls.directions" v-model="options.direction" />
      <RadioInputGroup label="标点" :options="controls.puncts" v-model="options.punct" />
    </div>
    <RadioInputGroup label="文本" :options="controls.textIds" v-model="options.textId" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { randomChar } from '../utils'
import RadioInputGroup from '../components/RadioInputGroup.vue'
import RangeInput from '../components/RangeInput.vue'

const controls = {
  xwgt: { name: 'xwgt', label: '变量 X', min: 100, max: 900 },
  ywgt: { name: 'ywgt', label: '变量 Y', min: 100, max: 900 },
  weights: [
    { name: 'w-thin', label: '纤', value: 'thin' },
    { name: 'w-light', label: '细', value: 'light' },
    { name: 'w-medium', label: '中', value: 'medium' },
    { name: 'w-bold', label: '粗', value: 'bold' },
    { name: 'w-heavy', label: '黑', value: 'heavy' },
  ],
  contrasts: [
    { name: 'c-normal', label: '无', value: 'normal' },
    { name: 'c-contrast', label: '正', value: 'contrast' },
    { name: 'c-reverse', label: '反', value: 'reverse' },
  ],
  // TODO: handle default values
  size: { name: 'size', label: '字号', min: 16, max: 96, reset: true, default: 40 },
  leading: { name: 'leading', label: '行距', min: 1, max: 4, step: 0.05, reset: true, default: 1.3 },
  directions: [
    { name: 'direction-horizontal', label: '横排', value: 'horizontal-tb' },
    { name: 'direction-vertical', label: '直排', value: 'vertical-rl' },
  ],
  puncts: [
    { name: 'punct-default', label: '默认', value: 'default' },
    { name: 'punct-kaiming', label: '开明', value: 'kaiming' },
    { name: 'punct-full', label: '全宽', value: 'full' },
  ],
  textIds: [
    { name: 'id-a', label: '甲', value: 'a' },
    { name: 'id-b', label: '乙', value: 'b' },
    { name: 'id-c', label: '丙', value: 'c' },
    { name: 'id-random', label: '随机', value: 'random' },
  ],
}

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
