<template>
  <div>
    <p class="mb-2">
      <ul class="inline-flex gap-[var(--em)] sm:gap-[calc(var(--em)*2)]">
        <li v-for="member in members.slice(0, 2)"><AboutMember v-bind="member" /></li>
      </ul>
      <br />
      <AboutLink href="https://tjdi.tongji.edu.cn" :text="$t('about.tongji-di')" />
    </p>
    <p>
      <AboutMember v-bind="members[2]" />
      <br />
      <AboutLink href="https://atelier-anchor.com" :text="$t('about.atelier-anchor')" />
    </p>
  </div>
  <p>
    <span v-html="cjkKern($t('about.repository'))"></span>
    <br />
    <a :href="repositoryUrl" target="_blank">{{ repositoryUrl }}</a>
  </p>
</template>

<script setup lang="ts">
import { cjkKern } from '@/utils'
import AboutLink from '@/components/about/AboutLink.vue'
import AboutMember from '@/components/about/AboutMember.vue'

const members = [
  {
    title: 'designer',
    name: { 'zh-hans': '刘育黎', 'zh-hant': '劉育黎', en: 'Willie Liu' },
    href: 'mailto:owill@foxmail.com',
  },
  {
    title: 'supervisor',
    name: { 'zh-hans': '杜钦', 'zh-hant': '杜欽', en: 'Qin Du' },
  },
  {
    title: 'developer',
    name: { 'zh-hans': '曾祥东', 'zh-hant': '曾祥東', en: 'Xiangdong Zeng' },
    href: 'https://stone-zeng.github.io',
  },
]
const repositoryUrl = 'https://github.com/atelier-anchor/luohei-variable'
</script>
