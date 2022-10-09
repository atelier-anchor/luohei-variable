<template>
  <div>
    <div class="mb-2">
      <ul class="inline-flex gap-4 sm:gap-8">
        <li><AboutMember :member="members[0]" /></li>
        <li><AboutMember :member="members[1]" /></li>
      </ul>
      <br />
      <AboutLink href="https://tjdi.tongji.edu.cn">
        {{ $t('about.tongji-di') }}
      </AboutLink>
    </div>
    <p>
      <AboutMember :member="members[2]" />
      <br />
      <AboutLink href="https://atelier-anchor.com">
        {{ $t('about.atelier-anchor') }}
      </AboutLink>
    </p>
  </div>
</template>

<script setup>
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
</script>
