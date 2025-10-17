<script setup lang="ts">
import { generateAddAffixFamiliesPool } from '../utils/generatePool'
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import type { Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const addModifier = (minimumLevel: number) => {
  for (let i = 0; i < (omenState.omenConfig.greaterExaltation ? 2 : 1); i++) {
    const _modsFamily = generateAddAffixFamiliesPool(
      normalMods.normalModsFamily,
      itemState.affixFamilies,
      {
        filterByTags: omenState.omenConfig.homogenisingExaltaion,
        onlyPrefix: omenState.omenConfig.sinistralExaltation,
        onlySuffix: omenState.omenConfig.dextralExaltation,
      },
    )

    if (_modsFamily.length) {
      const hitModsFamily = randomlyObtainAffixFamily<Modifier[]>(_modsFamily)

      const hitMod = randomlyObtainAffix(hitModsFamily.items, minimumLevel)

      itemState.addAffix(hitModsFamily, hitMod)
    }
  }
}
</script>
<template>
  <button @click="addModifier(minimumLevel)">{{ name }}</button>
</template>

<style scoped></style>
