<template>
  <div class="flex flex-col items-center justify-center gap-8 text-center h-screen px-8 sm:px-16">
    <p class="text-lg font-optical-size-lg max-w-3xl" v-html="text"></p>
    <div>
      <ul class="flex gap-8 justify-center">
        <li><span class="mr-4">设计</span><a href="mailto:owill@foxmail.com">刘育黎</a></li>
        <li><span class="mr-4">导师</span>杜钦</li>
      </ul>
      <p>（<a href="https://tjdi.tongji.edu.cn/">同济大学设计创意学院</a>）</p>
      <p>
        <span class="mr-4">技术支持</span><a href="mailto:xdzeng96@gmail.com">曾祥东</a> （<a
          href="https://atelier-anchor.com/"
          >atelierAnchor</a
        >）
      </p>
    </div>
    <p>二〇二二年三月<span class="mr-4"></span>作于上海家中</p>
  </div>
</template>

<script setup>
const text =
  '可变字体「络黑」源自刘育黎的毕业设计项目「面向动态图形的中文可变字体」，由两个变量作&NoBreak;用于笔画粗细，产生不同的对比样式。'
    .replace(/「/g, '<span class="ml-2">「</span>')
    .replace(/」([\u4e00-\u9fff])/g, '<span class="mr-2">」</span>$1')
    .replace(/，/g, '<span class="mr-2">，</span>')
    .replace(/([\u4e00-\u9fff]{2})(.)$/g, '<span class="whitespace-nowrap">$1</span>$2')
</script>
