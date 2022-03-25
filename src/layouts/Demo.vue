<template>
  <ColorContainer>
    <div
      class="flex flex-col sm:flex-row sm:justify-between gap-8 min-h-screen px-8 sm:px-16 pt-20"
    >
      <div class="sticky flex flex-col gap-4 w-64 h-fit top-6 bg-white dark:bg-dark">
        <div>
          <RangeInput
            v-for="(item, name) in rangeInputs"
            :key="name"
            :name="name"
            :label="item.label"
            :min="item.min"
            :max="item.max"
            v-model.number="item.value"
          />
        </div>
        <div class="flex items-center gap-4">
          <label class="w-16">文本</label>
          <div class="flex gap-4">
            <template v-for="item in textTypes">
              <input
                type="radio"
                :id="item.name"
                :name="item.name"
                :value="item.value"
                v-model="textType"
                class="hidden appearance-none"
              />
              <label :for="item.name" :class="{ 'font-bold': item.value === textType }">
                {{ item.label }}
              </label>
            </template>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <label class="w-16">方向</label>
          <div class="flex gap-4">
            <template v-for="item in writingModes">
              <input
                type="radio"
                :id="item.name"
                :name="item.name"
                :value="item.value"
                v-model="writingMode"
                class="hidden appearance-none"
              />
              <label :for="item.name" :class="{ 'font-bold': item.value === writingMode }">
                {{ item.label }}
              </label>
            </template>
          </div>
        </div>
      </div>
      <div
        class="flex-1 text-[2rem] overflow-x-auto"
        :style="{
          fontSize: `${rangeInputs.size.value}px`,
          fontVariationSettings: `'XWGT' ${rangeInputs.xwgt.value}, 'YWGT' ${rangeInputs.ywgt.value}`,
          writingMode: writingMode,
          paddingTop: writingMode === 'vertical-rl' ? '0.2em' : '0',
        }"
      >
        <template v-for="line in getText(textType)">
          {{ line }}
          <br />
        </template>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { randomChar, scale } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import RangeInput from '../components/RangeInput.vue'

const texts = {
  a: ['天上取样人间织， 染作江南春水色。', '春江潮水连海平， 海上明月共潮生。'],
  b: ['面向动态图形的中文可变字体设计', '「络黑」 LuoHei Variable'],
  c: ['风我酬意警鹰纛\u{30EDD}', 'Gampsocleis gratiosa', '2.718281828459…'],
}

const textTypes = [
  { name: 'radio-a', value: 'a', label: '甲' },
  { name: 'radio-b', value: 'b', label: '乙' },
  { name: 'radio-c', value: 'c', label: '丙' },
  { name: 'radio-random', value: 'random', label: '随机' },
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

const textType = ref(textTypes[0].value)
const writingMode = ref(writingModes[0].value)

// Manually set the weights of different puncts.
const puncts = '，，，，。。。！'.split('')
const generateRandomText = () =>
  [...Array(8).keys()]
    .map(() => {
      const len = Math.floor(Math.random() * 15) + 5
      const punct = puncts[Math.floor(Math.random() * puncts.length)]
      return [...Array(len).keys()].map(() => randomChar()).join('') + punct + ' '
    })
    .join('')
    .replace(/.\s$/g, '。')
const randomText = ref('')
const getText = (type) => (type === 'random' ? [randomText.value] : texts[type])

// TODO: avoid using DOM query
onMounted(() => {
  const button = document.querySelector('label[for="radio-random"]')
  if (button) button.addEventListener('click', () => (randomText.value = generateRandomText()))
})
</script>
