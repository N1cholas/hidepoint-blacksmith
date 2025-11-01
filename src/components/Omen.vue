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
  outline: 2px solid transparent;
  border-radius: 2px;
  padding: 2px 6px;
}

.omen:hover {
  background: hsla(160, 100%, 37%, 0.1);
}

.selected {
  outline-color: hsla(160, 100%, 37%, 1);
}
</style>
