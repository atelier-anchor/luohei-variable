<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 md:hidden">
      <button :class="{ 'font-bold': showFontOptions }" @click="toggleOptions">
        {{ $t('recipe.font-options') }}
      </button>
      <button :class="{ 'font-bold': !showFontOptions }" @click="toggleOptions">
        {{ $t('recipe.layout-options') }}
      </button>
    </div>
    <div class="md:block" :class="{ hidden: !showFontOptions }">
      <RangeInput :option="controls.xwgt" v-model.number="options.xwgt" />
      <RangeInput :option="controls.ywgt" v-model.number="options.ywgt" />
      <RadioInputGroup
        :label="$t('recipe.weight')"
        :options="controls.weights"
        v-model="options.weight"
      />
      <RadioInputGroup
        :label="$t('recipe.contrast')"
        :options="controls.contrasts"
        v-model="options.contrast"
      />
    </div>
    <div class="md:block" :class="{ hidden: showFontOptions }">
      <RangeInput :option="controls.size" v-model.number="options.size" />
      <RangeInput :option="controls.leading" v-model.number="options.leading" />
      <RadioInputGroup
        :label="$t('recipe.direction')"
        :options="controls.directions"
        v-model="options.direction"
      />
      <RadioInputGroup
        :label="$t('recipe.punct')"
        :options="controls.puncts"
        v-model="options.punct"
      />
    </div>
    <RadioInputGroup
      :label="$t('recipe.text')"
      :options="controls.textIds"
      v-model="options.textId"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { randomChar } from '@/utils'
import RadioInputGroup from '@/components/recipe/RadioInputGroup.vue'
import RangeInput from '@/components/recipe/RangeInput.vue'

const controls = reactive({
  xwgt: { name: 'xwgt', label: 'recipe.x-axis', min: 100, max: 900 },
  ywgt: { name: 'ywgt', label: 'recipe.y-axis', min: 100, max: 900 },
  weights: [
    { name: 'w-thin', label: 'recipe.weights.thin', value: 'thin' },
    { name: 'w-light', label: 'recipe.weights.light', value: 'light' },
    { name: 'w-medium', label: 'recipe.weights.medium', value: 'medium' },
    { name: 'w-bold', label: 'recipe.weights.bold', value: 'bold' },
    { name: 'w-heavy', label: 'recipe.weights.heavy', value: 'heavy' },
  ],
  contrasts: [
    { name: 'c-none', label: 'recipe.contrasts.none', value: 'none' },
    { name: 'c-normal', label: 'recipe.contrasts.normal', value: 'normal' },
    { name: 'c-reverse', label: 'recipe.contrasts.reverse', value: 'reverse' },
  ],
  // TODO: handle default values
  size: { name: 'size', label: 'recipe.font-size', min: 16, max: 96, reset: true, default: 40 },
  leading: {
    name: 'leading',
    label: 'recipe.leading',
    min: 1,
    max: 4,
    step: 0.05,
    reset: true,
    default: 1.3,
  },
  directions: [
    { name: 'direction-horizontal', label: 'recipe.directions.horizontal', value: 'horizontal-tb' },
    { name: 'direction-vertical', label: 'recipe.directions.vertical', value: 'vertical-rl' },
  ],
  puncts: [
    { name: 'punct-default', label: 'recipe.puncts.default', value: 'default' },
    { name: 'punct-kaiming', label: 'recipe.puncts.kaiming', value: 'kaiming' },
    { name: 'punct-full', label: 'recipe.puncts.full', value: 'full' },
  ],
  textIds: [
    { name: 'id-a', label: 'recipe.texts.a', value: 'a' },
    { name: 'id-b', label: 'recipe.texts.b', value: 'b' },
    { name: 'id-c', label: 'recipe.texts.c', value: 'c' },
    { name: 'id-random', label: 'recipe.texts.random', value: 'random' },
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

const props = defineProps({
  options: Object,
})
</script>
