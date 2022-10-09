<template>
  <button v-if="isHome" :class="{ tracking: isLocaleZh }" @click="showVideo">
    {{ $t('header.video') }}
  </button>
  <a
    v-else
    href="#/"
    v-html="$t('header.title-display', [`<span class='tracking'>${$t('header.name')} </span>`])"
  >
  </a>
</template>

<script setup>
import { inject } from 'vue'
import { isLocaleZh } from '@/i18n'

const { isHome } = inject('currentPath')
const { showVideo } = inject('video')
</script>
