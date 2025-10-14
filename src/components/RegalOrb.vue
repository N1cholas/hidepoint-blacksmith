<script setup lang="ts">
import {
  generateModsFamily,
  modFamilyWeightedRandom,
  getModifier,
  filterModsFamilyByTags,
} from '../utils/utils'
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

const addModifier = (minimumLevel: number) => {
  let _modsFamily = normalMods.normalModsFamily

  _modsFamily = generateModsFamily(_modsFamily, itemState.modsFamily)

  if (omenState.omenConfig.homogenisingCoronation) {
    _modsFamily = filterModsFamilyByTags(_modsFamily, itemState.modsFamily)
  }

  if (_modsFamily.length) {
    const hitModsFamily = modFamilyWeightedRandom<Modifier[]>(_modsFamily)

    const hitMod = getModifier(hitModsFamily.items, minimumLevel)

    itemState.modsFamily.push(hitModsFamily)

    itemState.mods.push({
      ...hitMod,
      powerLevel: hitModsFamily.items.length - hitModsFamily.items.indexOf(hitMod),
    })
  }
}
</script>
<template>
  <button :class="{ disable }" @click="addModifier(minimumLevel)" :disabled="disable">
    {{ name }}
  </button>
</template>

<style scoped></style>
