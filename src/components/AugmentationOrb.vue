<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_TYPE, type Affix } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { generateAddPool } from '@/utils/generatePool'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()

const disable = computed(() => {
  return !(
    itemState.itemType === ITEM_TYPE.MAGIC &&
    itemState.propsHistory.transmutationOrb &&
    !itemState.propsHistory.augmentationOrb
  )
})

// 增幅石
const addModifier = (minimumLevel: number, maximumLevel: number) => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {})

  if (newAffixFamily.length) {
    const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)
    const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      itemState.addAffix(hitAffixFamily, hitAffix)

      itemState.setItemType(ITEM_TYPE.MAGIC)

      itemState.setPropsHistory({ augmentationOrb: true })
    }
  }
}
</script>
<template>
  <button @click="addModifier(minimumLevel, maximumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
