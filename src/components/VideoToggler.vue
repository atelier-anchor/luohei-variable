<template>
  <div>
    <button v-show="isHome" :class="{ tracking: isLocaleZh }" @click="showVideo">
      {{ $t('header.video') }}
    </button>
    <a v-show="!isHome" href="#/">
      <span v-if="isLocaleZh" class="tracking">{{ $t('header.name') + ' ' }}</span>
      {{ $t('header.name-en') }}
    </a>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { isLocaleZh } from '@/i18n'

const { isHome } = inject('currentPath')
const { showVideo } = inject('video')
</script>
