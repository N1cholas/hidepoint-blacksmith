<script setup lang="ts">
import {
  generateModsFamily,
  modFamilyWeightedRandom,
  getModifier,
  filterModsFamilyByTags,
  onlyGeneratePrefixModsFamily,
} from '../utils/utils'
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import type { Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const addModifier = (minimumLevel: number) => {
  let _modsFamily = normalMods.normalModsFamily

  _modsFamily = generateModsFamily(_modsFamily, itemState.modsFamily)

  if (omenState.omenConfig.homogenisingExaltaion) {
    _modsFamily = filterModsFamilyByTags(_modsFamily, itemState.modsFamily)
  }

  if (omenState.omenConfig.sinistralExaltation) {
    _modsFamily = onlyGeneratePrefixModsFamily(_modsFamily)
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
  <button @click="addModifier(minimumLevel)">{{ name }}</button>
</template>

<style scoped></style>
