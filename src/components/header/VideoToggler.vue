<template>
  <div>
    <button v-show="isHome" :class="{ tracking: isLocaleZh }" @click="videoShown = true">
      {{ $t('header.video') }}
    </button>
    <a v-show="!isHome" href="#/">
      <span v-if="isLocaleZh" class="tracking">{{ $t('header.name') + ' ' }}</span>
      {{ $t('header.name-en') }}
    </a>
    <Teleport v-if="videoShown" to="main">
      <VideoPanel />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { inject, provide, ref } from 'vue'
import { isLocaleZh } from '@/i18n'
import VideoPanel from '@/components/home/VideoPanel.vue'
import type { Router } from '@/App.vue'

const { isHome } = inject('router') as Router

const videoShown = ref(false)
provide('closeVideo', () => (videoShown.value = false))
</script>
