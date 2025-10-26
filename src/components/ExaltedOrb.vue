<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { ITEM_RARITY, MOD_GENERATION_TYPE, type Affix } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { generateAddPool } from '@/utils/generatePool'
import { computed } from 'vue'
import { ITEM_CONFIG } from '@/config/itemConfig'

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
    itemState.affixes.length < 6 &&
    itemState.itemRarity === ITEM_RARITY.RARE &&
    maximumLevel >= minimumLevel
  )
})

// 添加词缀规则：去重 前3 后3 共6
const addModifier = () => {
  const iterations = omenState.omenConfig.greaterExaltation ? 2 : 1

  for (let i = 0; i < iterations; i++) {
    const newAffixFamily = generateAddPool(normalMods.normalModsFamily, itemState.affixFamilies, {
      deduplication: true,
      filterByTags: omenState.omenConfig.homogenisingExaltaion,
      onlyPrefix: shouldOnlyPrefix(),
      onlySuffix: shouldOnlySuffix(),
    })

    if (newAffixFamily.length) {
      const hitAffixFamily = randomlyObtainAffixFamily<Affix[]>(newAffixFamily)
      const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

      if (hitAffix) {
        itemState.addAffix(hitAffixFamily, hitAffix)

        itemState.setItemRarity(ITEM_RARITY.RARE)

        itemState.setPropsHistory({ exaltedOrb: true })
      }
    }
  }
}

const shouldOnlyPrefix = (): boolean => {
  return (
    omenState.omenConfig.sinistralExaltation ||
    itemState.affixes.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX)
      .length >= ITEM_CONFIG.PREFIX
  )
}

const shouldOnlySuffix = (): boolean => {
  return (
    omenState.omenConfig.dextralExaltation ||
    itemState.affixes.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX)
      .length >= ITEM_CONFIG.SUFFIX
  )
}
</script>
<template>
  <button @click="addModifier()" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
