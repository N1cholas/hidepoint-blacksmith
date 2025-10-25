<script setup lang="ts">
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_TYPE, type Affix } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { computed } from 'vue'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'

const { maximumLevel, minimumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => {
  return !(
    itemState.itemType === ITEM_TYPE.MAGIC &&
    itemState.propsHistory.augmentationOrb &&
    !itemState.propsHistory.regalOrb &&
    maximumLevel >= minimumLevel
  )
})

// 富豪石
const addModifier = () => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
    filterByTags: omenState.omenConfig.homogenisingCoronation,
  })

  if (newAffixFamily.length) {
    const hitModsFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)

    const hitMod = randomlyObtainAffix(hitModsFamily.items, minimumLevel, maximumLevel)

    itemState.addAffix(hitModsFamily, hitMod)

    itemState.setItemType(ITEM_TYPE.RARE)

    itemState.setPropsHistory({ regalOrb: true })
  }
}
</script>
<template>
  <button :class="{ disable }" @click="addModifier()" :disabled="disable">
    {{ name }}
  </button>
</template>

<style scoped></style>
