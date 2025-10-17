<script setup lang="ts">
import _ from 'lodash'
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { MOD_GENERATION_TYPE, type Modifier } from '@/types/types'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { randomlyObtainAffixFamily, randomlyObtainAffix } from '@/utils/randomlyObtain'
import { generateAffixFamiliesPool } from '@/utils/generatePool'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => {
  return itemState.affixes.length >= 6
})

// 添加词缀规则：去重 前3 后3 共6
const addModifier = (minimumLevel: number) => {
  const iterations = omenState.omenConfig.greaterExaltation ? 2 : 1

  for (let i = 0; i < iterations; i++) {
    const newAffixFamily = generateAffixFamiliesPool(
      normalMods.normalModsFamily,
      itemState.affixFamilies,
      {
        deduplication: true,
        filterByTags: omenState.omenConfig.homogenisingExaltaion,
        onlyPrefix: shouldOnlyPrefix(),
        onlySuffix: shouldOnlySuffix(),
      },
    )

    if (newAffixFamily.length) {
      const hitAffixFamily = randomlyObtainAffixFamily<Modifier[]>(newAffixFamily)
      const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel)

      if (hitAffix) {
        itemState.addAffix(hitAffixFamily, hitAffix)
      }
    }
  }
}

const shouldOnlyPrefix = (): boolean => {
  return (
    omenState.omenConfig.sinistralExaltation ||
    itemState.affixes.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX)
      .length >= itemState.config.suffixNum
  )
}

const shouldOnlySuffix = (): boolean => {
  return (
    omenState.omenConfig.dextralExaltation ||
    itemState.affixes.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX)
      .length >= itemState.config.prefixNum
  )
}
</script>
<template>
  <button @click="addModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
