<template>
  <ColorContainer class="px-8 sm:px-16">
    <div class="flex flex-col md:flex-row gap-8 h-screen max-w-screen-2xl pt-20 pb-6 mx-auto">
      <DemoControls :options="options" class="w-64" />
      <DemoText :options="options" class="flex-1" />
    </div>
  </ColorContainer>
</template>

<script setup>
import { reactive } from 'vue'
import { scale } from '../utils'
import ColorContainer from '../components/ColorContainer.vue'
import DemoControls from '../components/DemoControls.vue'
import DemoText from '../components/DemoText.vue'

const options = reactive({
  showFontOptions: true,
  fontSize: 40,
  xwgt: scale(Math.random(), 300, 800),
  ywgt: scale(Math.random(), 300, 800),
  direction: 'horizontal-tb',
  punct: 'default',
  leading: 1.3,
  textId: 'a',
  randomText: [],
})
</script>
