<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <button :class="{ 'font-bold': showFontOptions }" @click="toggleOptions">字体设置</button>
      <button :class="{ 'font-bold': !showFontOptions }" @click="toggleOptions">排版设置</button>
    </div>
    <div v-if="showFontOptions">
      <RangeInput :option="controls.fontSize" v-model.number="options.fontSize" />
      <RangeInput :option="controls.xwgt" v-model.number="options.xwgt" />
      <RangeInput :option="controls.ywgt" v-model.number="options.ywgt" />
    </div>
    <div v-else>
      <RadioInputGroup label="方向" :options="controls.directions" v-model="options.direction" />
      <RadioInputGroup label="标点" :options="controls.punct" v-model="options.punct" />
      <RangeInput :option="controls.leading" v-model.number="options.leading" />
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
  fontSize: { name: 'size', label: '字号', min: 16, max: 96 },
  xwgt: { name: 'xwgt', label: '变量 X', min: 100, max: 900 },
  ywgt: { name: 'ywgt', label: '变量 Y', min: 100, max: 900 },
  directions: [
    { name: 'horizontal', label: '横排', value: 'horizontal-tb' },
    { name: 'vertical', label: '直排', value: 'vertical-rl' },
  ],
  punct: [
    { name: 'default', label: '默认', value: 'default' },
    { name: 'kaiming', label: '开明', value: 'kaiming' },
    { name: 'full', label: '全宽', value: 'full' },
  ],
  leading: { name: 'leading', label: '行距', min: 1, max: 4, step: 0.05 },
  textIds: [
    { name: 'a', label: '甲', value: 'a' },
    { name: 'b', label: '乙', value: 'b' },
    { name: 'c', label: '丙', value: 'c' },
    { name: 'random', label: '随机', value: 'random' },
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
  const button = document.querySelector('label[for="radio-random"]')
  if (button)
    button.addEventListener('click', () => (props.options.randomText = generateRandomText()))
})

const props = defineProps({ options: Object })
</script>
