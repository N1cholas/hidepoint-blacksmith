<script setup lang="ts">
import { useOmen } from '@/stores/modules/useOmen'

defineProps<{
  name: string
  omenConfigKey: keyof OmenConfig
}>()

const _omen = useOmen()
</script>
<template>
  <div class="omen-wrapper">
    <t-switch v-modle="_omen.config[omenConfigKey]" :label="[name, name]" size="large"> </t-switch>
  </div>
</template>

<style scoped>
.omen-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
}
</style>
