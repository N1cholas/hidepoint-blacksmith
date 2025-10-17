<script setup lang="ts">
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { useItemState } from '@/stores/itemState'
import { type Modifier, MOD_GENERATION_TYPE } from '@/types/types'
import {
  reverseRandomlyObtainAffixFamily,
  randomlyObtainAffixFamily,
  randomlyObtainAffix,
} from '@/utils/randomlyObtain'
import { generateAffixFamiliesPool } from '@/utils/generatePool'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()

const disable = computed(() => itemState.affixes.length < 3)

// 混沌石替换的词条可以是前缀或者后缀
// 但是要处理6词条的情况，如果替换的是前缀，那么生成的也是前缀.如果替换的是后缀，那么生成的也是后缀。
const changeModifier = (minimumLevel: number) => {
  const shouldRemoveAffixFamily = reverseRandomlyObtainAffixFamily<Modifier[]>(
    itemState.affixFamilies,
  )

  const [shouldRemoveAffixFamilyIndex, shouldRemoveAffixIndex] = itemState.findIndexById(
    shouldRemoveAffixFamily.id,
  )

  const is6Mods = itemState.affixFamilies.length === 6
  const shouldRemoveAffixFamilyType = shouldRemoveAffixFamily.modGenerationTypeID

  const newAffixFamily = generateAffixFamiliesPool(
    normalMods.normalModsFamily,
    itemState.affixFamilies,
    {
      deduplication: true,
      onlyPrefix: is6Mods && shouldRemoveAffixFamilyType === MOD_GENERATION_TYPE.PREFIX,
      onlySuffix: is6Mods && shouldRemoveAffixFamilyType === MOD_GENERATION_TYPE.SUFFIX,
    },
  )

  if (newAffixFamily.length) {
    const hitAffixFamily = randomlyObtainAffixFamily<Modifier[]>(newAffixFamily)

    const hitAffix = randomlyObtainAffix(hitAffixFamily.items, minimumLevel)

    if (hitAffix) {
      itemState.replaceAffix(
        hitAffixFamily,
        shouldRemoveAffixFamilyIndex,
        hitAffix,
        shouldRemoveAffixIndex,
      )
    }
  }
}
</script>

<template>
  <button @click="changeModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
