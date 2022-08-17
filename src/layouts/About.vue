<template>
  <div
    class="flex h-screen flex-col items-center justify-center gap-8 px-8 text-center text-rfs-base sm:px-16"
  >
    <div>
      <p class="font-optical-size-lg text-rfs-lg">
        In Memory of<br />
        <a
          href="https://typemedia.org/noordzij/"
          target="_blank"
          class="hover:font-optical-size-lg font-bold"
          >Gerrit Noordzij</a
        >
      </p>
      <p>(1931&ndash;2022)</p>
    </div>
    <p class="font-optical-size-lg max-w-3xl text-rfs-lg" v-html="text"></p>
    <div>
      <ul class="flex justify-center gap-8">
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
    <p>二〇二二年四月<span class="mr-4"></span>作于上海家中</p>
  </div>
</template>

<script setup>
import { cjkKern } from '../utils'

const text = cjkKern(
  '可变字体「络黑」源自刘育黎的毕业设计项目「面向动态图形的中文可变字体」，由两个变量作用于笔画粗细，产生不同的对比样式。'
)
</script>
