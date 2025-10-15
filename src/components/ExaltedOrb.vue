<script setup lang="ts">
import { modFamilyWeightedRandom, getModifier, processModsFamily } from '../utils/utils'
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
  for (let i = 0; i < (omenState.omenConfig.greaterExaltation ? 2 : 1); i++) {
    const _modsFamily = processModsFamily(normalMods.normalModsFamily, itemState.modsFamily, {
      homogenisingExaltaion: omenState.omenConfig.homogenisingExaltaion,
      sinistralExaltation: omenState.omenConfig.sinistralExaltation,
      dextralExaltation: omenState.omenConfig.dextralExaltation,
    })

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
}
</script>
<template>
  <button @click="addModifier(minimumLevel)">{{ name }}</button>
</template>

<style scoped></style>
