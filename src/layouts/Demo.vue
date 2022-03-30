<template>
  <ColorContainer class="px-8 sm:px-16">
    <div class="flex flex-col md:flex-row gap-8 h-screen max-w-screen-2xl pt-20 pb-6 mx-auto">
      <div class="flex flex-col gap-4 w-64">
        <div>
          <RangeInput
            v-for="(item, name) in rangeInputs"
            :option="Object.assign({ name: name }, item)"
            v-model.number="item.value"
          />
        </div>
        <RadioInputGroup label="文本" :options="textIds" v-model="textId" />
        <RadioInputGroup label="方向" :options="writingModes" v-model="writingMode" />
      </div>
      <DemoText
        :fontSize="rangeInputs.size.value"
        :xwgt="rangeInputs.xwgt.value"
        :ywgt="rangeInputs.ywgt.value"
        :writingMode="writingMode"
      >
        <p v-for="p in text" v-html="p"></p>
      </DemoText>
    </div>
  </ColorContainer>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { randomChar, scale } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import DemoText from '../components/DemoText.vue'
import RadioInputGroup from '../components/RadioInputGroup.vue'
import RangeInput from '../components/RangeInput.vue'

const texts = {
  a: [
    '天上取样人间织，染作江南春水色。',
    '春江潮水连海平，海上明月共潮生。',
    'Ad astra abyssosque!',
  ],
  b: ['面向动态图形的中文可变字体「络黑」（LuoHei Variable），设计于2020\u{2013}2022年间。'],
  c: ['个风我酬意警鹰纛\u{30EDD}', 'Fox nymphs grab quick-jived waltz.', '2.718281828459…'],
}

const textIds = [
  { name: 'a', value: 'a', label: '甲' },
  { name: 'b', value: 'b', label: '乙' },
  { name: 'c', value: 'c', label: '丙' },
  { name: 'random', value: 'random', label: '随机' },
]

const writingModes = [
  { name: 'radio-horizontal', value: 'horizontal-tb', label: '横排' },
  { name: 'radio-vertical', value: 'vertical-rl', label: '直排' },
]

const rangeInputs = reactive({
  size: { label: '字号', min: 16, max: 96, value: 40 },
  xwgt: { label: '变量 X', min: 100, max: 900, value: scale(Math.random(), 300, 800) },
  ywgt: { label: '变量 Y', min: 100, max: 900, value: scale(Math.random(), 300, 800) },
})

const textId = ref(textIds[0].value)
const writingMode = ref(writingModes[0].value)

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
  puncts = '，，，，。。。！'.split('') // Manually set the weights of different puncts.
) =>
  [...Array(parNum).keys()].map(() =>
    generateRandomPar(sentenceNum, sentenceMinLen, sentenceMaxLen, quoteProb, puncts)
  )

const randomText = ref([])
const text = computed(() => (textId.value === 'random' ? randomText.value : texts[textId.value]))

// TODO: avoid using DOM query
onMounted(() => {
  const button = document.querySelector('label[for="radio-random"]')
  if (button) button.addEventListener('click', () => (randomText.value = generateRandomText()))
})
</script>
