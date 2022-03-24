<template>
  <ColorContainer>
    <div
      class="flex flex-col sm:flex-row sm:justify-between gap-8 min-h-screen px-8 sm:px-16 pt-20"
    >
      <div class="sticky flex flex-col gap-4 w-64 h-fit top-6 bg-white dark:bg-dark">
        <div>
          <RangeInput id="font-size" label="字号" min="16" max="96" v-model.number="fontSize" />
          <RangeInput id="font-xwgt" label="变量 X" min="100" max="900" v-model.number="fontXwgt" />
          <RangeInput id="font-ywgt" label="变量 Y" min="100" max="900" v-model.number="fontYwgt" />
        </div>
        <!-- <RadioInput :options="textTypes" id-prefix="text" label="文本" v-model="textType"> -->
        <!-- </RadioInput> -->
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
          fontSize: `${fontSize}px`,
          fontVariationSettings: `'XWGT' ${fontXwgt}, 'YWGT' ${fontYwgt}`,
          writingMode: writingMode
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
import { ref } from 'vue'
import ColorContainer from '../components/ColorContainer.vue'
import RangeInput from '../components/RangeInput.vue'
// import RadioInput from '../components/RadioInput.vue'

const texts = {
  a: ['天上取样人间织， 染作江南春水色。', '春江潮水连海平， 海上明月共潮生。'],
  b: ['面向动态图形的中文可变字体设计', '「络黑」 LuoHei Variable'],
  c: ['风我酬意警鹰纛\u{30EDD}', 'Hamburge 0123'],
}

const textTypes = [
  { name: 'a', value: 'a', label: '甲' },
  { name: 'b', value: 'b', label: '乙' },
  { name: 'c', value: 'c', label: '丙' },
  { name: 'random', value: 'random', label: '随机' },
]

const writingModes = [
  { name: 'horizontal', value: 'horizontal-tb', label: '横排' },
  { name: 'vertical', value: 'vertical-rl', label: '直排' },
]

const fontSize = ref(40)
const fontXwgt = ref(100)
const fontYwgt = ref(100)

const textType = ref(textTypes[0].value)
const writingMode = ref(writingModes[0].value)

const getText = (type) => {
  if (type === 'random') {
    return [
      '上业个中书人今任位体作共击动十南印取变可叶同向品国图土夜大天始字',
      '对山工己平开录形态意我排文日明春月朝木本杜染样比毕水永江海潮点然',
      '王生田由画白的目空纛细织络置耳自色花草警计设转连造酬锚间随面风鹰',
    ]
  }
  return texts[type]
}
</script>
