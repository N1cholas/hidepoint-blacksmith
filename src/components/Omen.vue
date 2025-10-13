<script setup lang="ts">
import _ from 'lodash'
import { useOmenState } from '@/stores/omenState'
import type { OmenConfig } from '@/types/types'

defineProps<{
  name: string
  omenConfigKey: keyof OmenConfig
}>()

const omenState = useOmenState()
</script>
<template>
  <div>
    <input type="checkbox" v-model="omenState.omenConfig[omenConfigKey]" :id="omenConfigKey" />
    <label
      class="omen"
      :class="{ selected: omenState.omenConfig[omenConfigKey] }"
      :for="omenConfigKey"
    >
      {{ name }}
    </label>
  </div>
</template>

<style scoped>
input {
  display: none;
}
.omen {
  cursor: pointer;
  user-select: none;
  outline: 1px solid transparent;
  border-radius: 2px;
}

.selected {
  outline-color: rgb(183, 3, 3);
}
</style>
