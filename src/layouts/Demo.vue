<template>
  <ColorContainer>
    <div
      class="flex flex-col sm:flex-row sm:justify-between gap-8 min-h-screen px-8 sm:px-16 pt-20"
    >
      <div class="flex flex-col gap-4 w-64">
        <div>
          <RangeInput id="font-size" label="字号"></RangeInput>
          <RangeInput id="font-xwgt" label="变量一"></RangeInput>
          <RangeInput id="font-ywgt" label="变量二"></RangeInput>
        </div>
        <div class="flex justify-between">
          <button>文本甲</button>
          <button>文本乙</button>
          <button>文本丙</button>
          <button>随机</button>
        </div>
        <div>
          <button>直排文本</button>
        </div>
      </div>
      <div class="flex-1">
        <p class="text-[2rem] writing-vertical-rl">
          天上取样。人间织,染作江南, 春水!色
          <br />
          Hamburger 0123
        </p>
      </div>
    </div>
  </ColorContainer>
</template>

<script setup>
import ColorContainer from '../components/ColorContainer.vue'
import RangeInput from '../components/RangeInput.vue'
</script>
