<template>
  <div
    class="flex h-screen min-h-[720px] flex-col items-center justify-center gap-8 px-8 text-center text-rfs-base sm:px-16"
  >
    <AboutCommemoration />
    <AboutConcept />
    <AboutMemberGroup />
    <AboutDate />
  </div>
</template>

<script setup lang="ts">
import AboutCommemoration from '@/components/about/AboutCommemoration.vue'
import AboutConcept from '@/components/about/AboutConcept.vue'
import AboutDate from '@/components/about/AboutDate.vue'
import AboutMemberGroup from '@/components/about/AboutMemberGroup.vue'
</script>
