<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_TYPE, type Affix } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { generateAddPool } from '@/utils/generatePool'
import { computed } from 'vue'

const { maximumLevel, minimumLevel } = defineProps<{
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
    !itemState.propsHistory.augmentationOrb &&
    maximumLevel >= minimumLevel
  )
})

// 增幅石
const addModifier = () => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
  })

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
  <button @click="addModifier()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
