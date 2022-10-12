<template>
  <a :href="href" target="_blank" v-html="fixWrap(text)"></a>
</template>

<script setup>
const fixWrap = (s) =>
  s.replace(/([a-z0-9]+ [a-z0-9]+)([\.!?\)])$/gi, '<span class="no-break">$1</span>$2')

defineProps({
  href: String,
  text: String,
})
</script>
