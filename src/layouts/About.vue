<template>
  <div
    class="flex h-screen min-h-[600px] flex-col items-center justify-center gap-8 px-8 text-center text-rfs-base sm:px-16"
  >
    <div>
      <p class="font-optical-size-lg text-rfs-lg">
        {{ $t('about.commemorate') }}
      </p>
      <p class="font-optical-size-lg text-rfs-lg font-bold">
        <a href="https://typemedia.org/noordzij/" target="_blank" class="hover:font-normal"
          >Gerrit Noordzij</a
        >
      </p>
      <p>(1931&ndash;2022)</p>
    </div>
    <p
      class="font-optical-size-lg mb-8 max-w-3xl text-rfs-lg"
      v-html="
        $t('about.concept', [
          cjkKern($t('about.concept-0')),
          `<a href='https://tjdi.tongji.edu.cn/tags/projects/1833555' target='_blank'>${$t(
            'about.concept-1'
          )}</a>`,
          cjkKern($t('about.concept-2')),
        ])
      "
    ></p>
    <div>
      <ul class="flex gap-4 sm:gap-8">
        <li><AboutMember :member="members[0]" /></li>
        <li><AboutMember :member="members[1]" /></li>
      </ul>
      <p>
        <AboutMember :member="members[2]" />
      </p>
    </div>
    <div>
      <p>{{ $t('about.maintainer') }}</p>
      <p v-html="link('https://atelier-anchor.com')" class="mb-2"></p>
      <p>{{ $t('about.repository') }}</p>
      <p v-html="link('https://github.com/atelier-anchor/luohei-variable')"></p>
    </div>
    <p>
      {{ $t('about.last-updated') }}
      <time :datetime="date.toISOString()">{{ $t('about.date', dateValues) }}</time>
    </p>
  </div>
</template>

<script setup>
import { cjkKern } from '../utils'
import AboutMember from '../components/AboutMember.vue'

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

const link = (url) => `<a href="${url}" target="_blank">${url}</a>`

const date = new Date(import.meta.env.VITE_BUILD_DATE)
const dateValues = (() => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    date: date.toLocaleString('en', { year: 'numeric', month: 'long', day: 'numeric' }),
  }
})()
</script>
