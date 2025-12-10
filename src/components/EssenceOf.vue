<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<template>
  <t-button>{{ name }}</t-button>
</template>

<style scoped></style>
