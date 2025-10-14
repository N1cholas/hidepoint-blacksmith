<script setup lang="ts">
import {
  generateModsFamily,
  modFamilyWeightedRandom,
  getModifier,
  filterModsFamilyByTags,
  onlyPrefixModsFamily,
  onlySuffixModsFamily,
} from '../utils/utils'
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import type { Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => {
  return itemState.mods.length !== 2
})

const changeModifier = (minimumLevel: number) => {}
</script>
<template>
  <button @click="changeModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
