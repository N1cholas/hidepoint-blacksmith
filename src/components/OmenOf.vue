<script setup lang="ts">
import { useOmen, type OmenConfig } from '@/stores/modules/useOmen'
import type { SelectValue } from 'tdesign-vue-next'

defineProps<{
  name: string
  omenConfigKey: keyof OmenConfig
}>()

const _omen = useOmen()
</script>
<template>
  <div class="omen-wrapper">
    <t-switch
      :value="_omen.config[omenConfigKey]"
      :label="[name, name]"
      size="large"
      @change="
        (value: SelectValue) => {
          _omen.setConfig({ [omenConfigKey]: value })
        }
      "
    >
    </t-switch>
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
