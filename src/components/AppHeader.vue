<template>
  <header class="absolute z-10 w-full bg-light px-8 py-4 dark:bg-dark sm:px-16">
    <div
      class="font-optical-size-sm mx-auto flex max-w-screen-2xl text-sm"
      :class="[showNav ? 'justify-end' : 'justify-between']"
    >
      <template v-if="!showNav">
        <button
          v-if="isHome"
          :class="{ tracking: $i18n.locale === 'zh' }"
          @click="$emit('show-video')"
        >
          {{ $t('header.video') }}
        </button>
        <a
          v-else
          href="#/"
          v-html="
            $t('header.title-display', [`<span class='tracking'>${$t('header.name')} </span>`])
          "
        >
        </a>
      </template>
      <div class="flex gap-4">
        <nav class="absolute left-8 sm:static sm:block" :class="{ hidden: !showNav }">
          <ul class="flex gap-4">
            <li v-for="name in Object.keys(nav)" :class="{ tracking: $i18n.locale === 'zh' }">
              <a :href="`#/${name}`" :class="{ 'font-bold': currentPath.includes(name) }">
                {{ $t(`nav.${name}`) }}
              </a>
            </li>
          </ul>
        </nav>
        <button
          class="sm:hidden"
          :class="{ 'font-bold': showNav, tracking: $i18n.locale === 'zh' }"
          @click="showNav = !showNav"
        >
          {{ $t('header.start') }}
        </button>
        <LocaleToggler />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import LocaleToggler from './LocaleToggler.vue'

const showNav = ref(false)
const isHome = computed(() => props.currentPath === '' || props.currentPath === '#/')

window.addEventListener('resize', () => (showNav.value = false))

const props = defineProps({
  nav: Object,
  currentPath: String,
})
</script>
