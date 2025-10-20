<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_TYPE, type Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()

const disable = computed(() => {
  return !(itemState.itemType === ITEM_TYPE.NORMAL)
})

// 蜕变石
const addModifier = (minimumLevel: number) => {
  const hitAffixFamily = randomlyObtainAffixFamily<Modifier[]>(normalMods.normalModsFamily)
  const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel)

  if (hitAffix) {
    itemState.addAffix(hitAffixFamily, hitAffix)

    itemState.setItemType(ITEM_TYPE.MAGIC)

    itemState.setPropsHistory({ transmutationOrb: true })
  }
}
</script>
<template>
  <button @click="addModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
