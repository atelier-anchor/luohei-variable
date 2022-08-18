<template>
  <div
    class="flex h-screen flex-col items-center justify-center gap-8 px-8 text-center text-rfs-base sm:px-16"
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
      v-html="cjkKern($t('about.concept'))"
    ></p>
    <div>
      <ul class="flex justify-center gap-4 sm:gap-8">
        <li><AboutMember :member="members[0]" /></li>
        <li><AboutMember :member="members[1]" /></li>
      </ul>
      <p
        v-html="
          parenthese(
            `<a href='https://tjdi.tongji.edu.cn/' target='_blank'>${$t('about.tongji-di')}</a>`
          )[$i18n.locale]
        "
      ></p>
      <p>
        <AboutMember :member="members[2]" />
      </p>
    </div>
    <div>
      <p
        v-html="
          $t('about.maintainer', [
            `<a href='https://atelier-anchor.com/' target='_blank' class='font-bold hover:font-normal'>${$t(
              'about.atelier-anchor'
            )}</a>`,
          ])
        "
      ></p>
      <p v-html="$t('about.date-address', [`<span class='mr-4'></span>`])"></p>
    </div>
  </div>
</template>

<script setup>
import { cjkKern } from '../utils'
import AboutMember from '../components/AboutMember.vue'

const members = [
  { title: 'designer', name: { zh: '刘育黎', en: 'Willie Liu' }, href: 'mailto:owill@foxmail.com' },
  { title: 'supervisor', name: { zh: '杜钦', en: 'Qin Du' } },
  {
    title: 'developer',
    name: { zh: '曾祥东', en: 'Xiangdong Zeng' },
    href: 'https://stone-zeng.github.io',
  },
]

const parenthese = (s) => ({ zh: `（${s}）`, en: `(${s})` })
</script>
