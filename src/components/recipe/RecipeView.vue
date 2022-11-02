<template>
  <ColorContainer class="px-8 sm:px-16">
    <div class="mx-auto flex h-screen max-w-screen-2xl flex-col gap-8 pt-20 pb-6 md:flex-row">
      <RecipeControls :options="options" class="md:w-64" />
      <RecipeText :options="options" class="flex-1" />
    </div>
  </ColorContainer>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { contrasts, getInstance, weights, randomChoice } from '@/utils'
import ColorContainer from '@/components/ColorContainer.vue'
import RecipeControls from '@/components/recipe/RecipeControls.vue'
import RecipeText from '@/components/recipe/RecipeText.vue'
import type { Contrast, Weight } from '@/utils'
import type { RecipeOption } from '@/components/recipe/recipe'

const options: RecipeOption = reactive({
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
  const instance = getInstance(options.weight, options.contrast)
  options.xwgt = instance.xwgt
  options.ywgt = instance.ywgt
}

const updateRadioInputs = () => {
  for (const weight of weights) {
    for (const contrast of contrasts) {
      const instance = getInstance(weight, contrast)
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
  options.weight = randomChoice(weights) as Weight
  options.contrast = randomChoice(contrasts) as Contrast
  updateRangeInputs()

  weights.forEach((weight) =>
    document.querySelector(`#radio-w-${weight}`)?.addEventListener('change', updateRangeInputs)
  )
  contrasts.forEach((contrast) => {
    document.querySelector(`#radio-c-${contrast}`)?.addEventListener('change', updateRangeInputs)
  })

  document.querySelector('#range-xwgt')?.addEventListener('input', updateRadioInputs)
  document.querySelector('#range-ywgt')?.addEventListener('input', updateRadioInputs)
})
</script>
