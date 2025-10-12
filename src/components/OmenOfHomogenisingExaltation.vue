<script setup lang="ts">
import _ from 'lodash'
import { useOmenState } from '@/stores/omenState'
import { ref } from 'vue'
import { mapWritableState } from 'pinia'

defineProps<{
  name: string
}>()

const omenState = useOmenState()

const toggleOmenOfHomogenisingExaltaion = () => {
  omenState.omenConfig.homogenisingExaltaion = !omenState.omenConfig.homogenisingExaltaion
}
</script>
<template>
  <div>
    <span
      class="omen"
      :class="{ selected: omenState.omenConfig.homogenisingExaltaion }"
      @click="toggleOmenOfHomogenisingExaltaion"
      >{{ name }}
    </span>
  </div>
</template>

<style scoped>
.omen {
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 2px;
  border-radius: 2px;
}

.selected {
  border-color: rebeccapurple;
}
</style>
