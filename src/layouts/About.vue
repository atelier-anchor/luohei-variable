<template>
  <div
    class="flex h-screen min-h-[720px] flex-col items-center justify-center gap-8 px-8 text-center text-rfs-base sm:px-16"
  >
    <AboutCommemoration />
    <AboutConcept />
    <AboutMemberGroup />
    <p>
      {{ $t('about.repository') }}
      <br />
      <a :href="repositoryUrl" target="_blank">{{ repositoryUrl }}</a>
    </p>
    <AboutDate />
  </div>
</template>

<script setup>
import AboutCommemoration from '@/components/about/AboutCommemoration.vue'
import AboutConcept from '@/components/about/AboutConcept.vue'
import AboutDate from '@/components/about/AboutDate.vue'
import AboutMemberGroup from '@/components/about/AboutMemberGroup.vue'

const repositoryUrl = 'https://github.com/atelier-anchor/luohei-variable'
</script>
