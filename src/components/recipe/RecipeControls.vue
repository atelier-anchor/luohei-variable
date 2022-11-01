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
import { randomText } from '@/components/recipe/recipe-text'
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
const updateRandomText = () =>
  (props.options.randomText = randomText.generate(fallbackLocale.value))

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
