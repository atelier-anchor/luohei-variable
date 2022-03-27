<template>
  <div
    class="text-rfs flex flex-col items-center justify-center gap-8 text-center h-screen px-8 sm:px-16"
  >
    <div>
      <p class="text-rfs-lg font-optical-size-lg">
        In Memory of<br />
        <a
          href="https://typemedia.org/noordzij/"
          target="_blank"
          class="font-bold hover:font-optical-size-lg"
          >Gerrit Noordzij</a
        >
      </p>
      <p>(1931&ndash;2022)</p>
    </div>
    <p class="text-rfs-lg font-optical-size-lg max-w-3xl" v-html="text"></p>
    <div>
      <ul class="flex gap-8 justify-center">
        <li><span class="mr-4">设计</span><a href="mailto:owill@foxmail.com">刘育黎</a></li>
        <li><span class="mr-4">导师</span>杜钦</li>
      </ul>
      <p>（<a href="https://tjdi.tongji.edu.cn/" target="_blank">同济大学设计创意学院</a>）</p>
      <p>
        <span class="mr-4">技术支持</span>
        <a href="mailto:xdzeng96@gmail.com">曾祥东</a>
        <span class="cjk-kern-sm"></span>
        （<a href="https://atelier-anchor.com/" target="_blank">atelierAnchor</a>）
      </p>
    </div>
    <p>二〇二二年三月<span class="mr-4"></span>作于上海家中</p>
  </div>
</template>

<script setup>
import { cjkKern } from '../utils'

const text = cjkKern(
  '可变字体「络黑」源自刘育黎的毕业设计项目「面向动态图形的中文可变字体」，由两个变量作用于笔画粗细，产生不同的对比样式。'
)
</script>

<style scoped>
.text-rfs {
  font-size: calc(0.825rem + 0.375vw);
  @apply xl:text-base;
}

.text-rfs-lg {
  font-size: calc(1rem + 0.625vw);
  @apply xl:text-lg;
}
</style>
