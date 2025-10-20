<script setup lang="ts">
import { generateAddPool } from '@/utils/generatePool'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_TYPE, type Modifier } from '@/types/types'
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
  return !(
    itemState.itemType === ITEM_TYPE.MAGIC &&
    itemState.propsHistory.augmentationOrb &&
    !itemState.propsHistory.regalOrb
  )
})

const addModifier = (minimumLevel: number) => {
  const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
    deduplication: true,
    filterByTags: omenState.omenConfig.homogenisingCoronation,
  })

  if (newAffixFamily.length) {
    const hitModsFamily = randomlyObtainAffixFamily<Modifier[]>(newAffixFamily)

    const hitMod = randomlyObtainAffix(hitModsFamily.items, minimumLevel)

    itemState.addAffix(hitModsFamily, hitMod)

    itemState.setItemType(ITEM_TYPE.RARE)

    itemState.setPropsHistory({ regalOrb: true })
  }
}
</script>
<template>
  <button :class="{ disable }" @click="addModifier(minimumLevel)" :disabled="disable">
    {{ name }}
  </button>
</template>

<style scoped></style>
