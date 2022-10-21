<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 md:hidden">
      <button
        v-for="[status, label] in [
          [showFontOptions, 'font-options'],
          [!showFontOptions, 'typesetting-options'],
        ]"
        class="whitespace-nowrap"
        :class="{ 'font-bold': status }"
        @click="toggleOptions"
      >
        {{ $t(`recipe.${label}`) }}
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
import { onMounted, reactive, ref, watch } from 'vue'
import { fallbackLocale } from '@/i18n'
import { randomChar } from '@/utils'
import RadioInputGroup from '@/components/recipe/RadioInputGroup.vue'
import RangeInput from '@/components/recipe/RangeInput.vue'

const controls = reactive({
  xwgt: { name: 'xwgt', label: 'recipe.x-axis', min: 100, max: 900 },
  ywgt: { name: 'ywgt', label: 'recipe.y-axis', min: 100, max: 900 },
  weights: [
    { name: 'w-thin', label: 'recipe.weights.thin', abbr: true, value: 'thin' },
    { name: 'w-light', label: 'recipe.weights.light', abbr: true, value: 'light' },
    { name: 'w-medium', label: 'recipe.weights.medium', abbr: true, value: 'medium' },
    { name: 'w-bold', label: 'recipe.weights.bold', abbr: true, value: 'bold' },
    { name: 'w-heavy', label: 'recipe.weights.heavy', abbr: true, value: 'heavy' },
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

const randomText = {
  parNum: 2,
  sentenceNum: 4,
  sentenceMinLen: 5,
  sentenceMaxLen: 15,
  quoteProb: 0.2,
  wordProb: 0.2,
  wordMaxNum: 2,
  puncts: '，，，，。。。！？'.split(''), // Manually set the weights of different puncts
  // prettier-ignore
  words:
    ['Alex','and','AX','bad','bawds','baz','bed','big','blew','blow','blowzy','blue','bold','box','brave','brawny','brick','bright','brown','by','charged','chumps','cozy','daft','DJs','dog','dogs','dozy','driven','exchanged','fax','few','fight','five','flax','flick','flock','flummoxed','fog','fop','for','fowl','fowls','fox','fun','galvanized','game','gazed','get','ghost','gods','grab','graced','help','how','in','Iraq','is','Jack','Jay','jeopardy','jigs','Jim','jinx','jived','joaquin','job','jocks','jodhpurs','jog','jolt','jug','jump','jumping','jumps','jumpy','junk','jury','just','kvetching','lazy','luck','might','milk','mock','MTV','my','now','Nymph','nymphs','of','over','phoenix','pig','pled','prog','PyJamas','quack','quacking','quart','quartz','quick','quickly','quips','quiz','red','silk','sphinx','the','to','trebek','TV','two','veldt','very','vex','vexing','vixens','wafting','waltz','was','watch','waves','wax','Whangs','whelps','when','wizard','wolves','woven','zaps','zebra','zebras','zephyrs','zippy'],
  insertQuotes(s) {
    if (Math.random() > this.quoteProb) return s
    const a = Math.floor(Math.random() * (s.length - 1))
    const b = Math.floor(Math.random() * (s.length - a)) + a + 1
    return `${s.slice(0, a)}「${s.slice(a, b)}」${s.slice(b)}`
  },
  insertWords(s) {
    const words = [...Array(this.wordMaxNum)]
      .map(() =>
        Math.random() < this.wordProb
          ? this.words[Math.floor(Math.random() * this.words.length, this.words.length)]
          : undefined
      )
      .filter((e) => e)
    const pos = [...Array(words.length)]
      .map(() => Math.floor(Math.random() * s.length))
      .sort((a, b) => a < b)
    for (let i = 0; i < pos.length; i++) {
      s = s.slice(0, pos[i]) + `~${words[i]}~` + s.slice(pos[i])
    }
    return s.replaceAll('~~', '-').replaceAll('~', '') // Add hyphens for successive words
  },
  generateSentence() {
    const len = Math.floor(Math.random() * this.sentenceMaxLen) + this.sentenceMinLen
    const sentence = [...Array(len).keys()].map(() => randomChar(fallbackLocale.value)).join('')
    const punct = this.puncts[Math.floor(Math.random() * this.puncts.length)]
    return this.insertWords(this.insertQuotes(sentence)) + punct
  },
  generatePar() {
    return [...Array(this.sentenceNum).keys()]
      .map(() => this.generateSentence())
      .join('')
      .replace(/.$/g, '。')
      .replace(/(^|[。！？])[「（]?\w/g, (s) => s.toUpperCase())
  },
  generate() {
    return [...Array(this.parNum).keys()].map(() => this.generatePar())
  },
}

const updateRandomText = () => (props.options.randomText = randomText.generate())

watch(() => fallbackLocale.value, updateRandomText)

onMounted(() =>
  document
    .querySelector('label[for="radio-id-random"]')
    ?.addEventListener('click', updateRandomText)
)

const props = defineProps({
  options: Object,
})
</script>
