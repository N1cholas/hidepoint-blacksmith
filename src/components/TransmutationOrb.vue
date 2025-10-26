<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_RARITY, type Affix } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { computed } from 'vue'

const { minimumLevel, maximumLevel } = defineProps<{
  name: string
  minimumLevel: number
  maximumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()

const disable = computed(() => {
  return !(itemState.itemRarity === ITEM_RARITY.NORMAL && maximumLevel >= minimumLevel)
})

// 蜕变石
const addModifier = () => {
  const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(normalMods.normalModsFamily)
  const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

  if (hitAffix) {
    itemState.addAffix(hitAffixFamily, hitAffix)

    itemState.setItemRarity(ITEM_RARITY.MAGIC)

    itemState.setPropsHistory({ transmutationOrb: true })
  }
}
</script>
<template>
  <button @click="addModifier()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
