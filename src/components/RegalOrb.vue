<script setup lang="ts">
import { generateAffixFamilies, filterModsFamilyByTags } from '../utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import type { Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { computed } from 'vue'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => {
  return itemState.affixes.length !== 2
})

const addModifier = (minimumLevel: number) => {
  let _modsFamily = normalMods.normalModsFamily

  _modsFamily = generateAffixFamilies(_modsFamily, itemState.affixFamilies)

  if (omenState.omenConfig.homogenisingCoronation) {
    _modsFamily = filterModsFamilyByTags(_modsFamily, itemState.affixFamilies)
  }

  if (_modsFamily.length) {
    const hitModsFamily = randomlyObtainAffixFamily<Modifier[]>(_modsFamily)

    const hitMod = randomlyObtainAffix(hitModsFamily.items, minimumLevel)

    itemState.addAffix(hitModsFamily, hitMod)
  }
}
</script>
<template>
  <button :class="{ disable }" @click="addModifier(minimumLevel)" :disabled="disable">
    {{ name }}
  </button>
</template>

<style scoped></style>
