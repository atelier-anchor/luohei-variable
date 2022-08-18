<template>
  <span v-if="$i18n.locale === 'zh'" class="mr-2 sm:mr-4">{{ $t(`about.${member.title}`) }}</span>
  <template v-else>{{ $t(`about.${member.title}`) }}: </template>
  <a v-if="member.href" :href="member.href" target="_blank">{{ member.name[$i18n.locale] }}</a>
  <template v-else>{{ member.name[$i18n.locale] }}</template>
</template>

<script setup>
defineProps({
  member: Object,
})
</script>
