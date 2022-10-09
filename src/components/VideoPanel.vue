<template>
  <div class="absolute inset-0 z-10 bg-dark px-8 text-light sm:px-16">
    <div class="relative mx-auto flex h-screen max-w-screen-2xl items-center justify-center">
      <div class="font-optical-size-sm absolute top-0 right-0 py-4 text-sm">
        <button :class="{ tracking: isLocaleZh }" @click="closeVideo">
          {{ $t('header.close') }}
        </button>
      </div>
      <video controls class="max-h-[80%]">
        <source :src="videoSrc" type="video/webm" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { isLocaleZh } from '@/i18n'
import videoSrc from '@/assets/luohei.webm'

const { closeVideo } = inject('video')
</script>
