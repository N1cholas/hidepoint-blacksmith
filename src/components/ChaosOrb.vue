<script setup lang="ts">
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { MOD_GENERATION_TYPE, type Modifier } from '@/types/types'
import {
  reverseModsFamilyWeightedRandom,
  processModsFamily,
  modFamilyWeightedRandom,
  getModifier,
} from '@/utils/utils'
import _ from 'lodash'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => {
  return itemState.mods.length < 3
})

// 混沌石替换的词条可以是前缀或者后缀
// 但是要处理6词条的情况，如果替换的是前缀，那么生成的也是前缀.如果替换的是后缀，那么生成的也是后缀。
const changeModifier = (minimumLevel: number) => {
  // 随机选择一个需要移除的 ModsFamily
  const shouldRemoveModsFamily = reverseModsFamilyWeightedRandom<Modifier[]>(itemState.modsFamily)

  const modsFamilyIndex = itemState.modsFamily.findIndex(
    (family) => family.id === shouldRemoveModsFamily.id,
  )

  // 找到需要移除的 Mod
  const shouldRemoveModIndex = itemState.mods.findIndex(
    (mod) => mod.ModFamilyList[0] === shouldRemoveModsFamily.id,
  )

  // 生成新的 ModsFamily
  const _modsFamily = processModsFamily(normalMods.normalModsFamily, itemState.modsFamily, {
    homogenisingExaltaion: false,
    sinistralExaltation:
      itemState.modsFamily.length === 6 &&
      shouldRemoveModsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
    dextralExaltation:
      itemState.modsFamily.length === 6 &&
      shouldRemoveModsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  })

  if (_modsFamily.length) {
    // 随机选择一个新的 ModsFamily
    const hitModsFamily = modFamilyWeightedRandom<Modifier[]>(_modsFamily)

    // 从新的 ModsFamily 中选择一个 Mod
    const hitMod = getModifier(hitModsFamily.items, minimumLevel)

    if (hitMod) {
      // 替换 itemState.modsFamily 中的 shouldRemoveModsFamily 为 hitModsFamily
      if (modsFamilyIndex !== -1) {
        itemState.modsFamily[modsFamilyIndex] = hitModsFamily
      }

      // 替换 itemState.mods 中的 shouldRemoveMod 为 hitMod
      if (shouldRemoveModIndex !== -1) {
        itemState.mods[shouldRemoveModIndex] = hitMod
      }
    }
  }
}
</script>

<template>
  <button @click="changeModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
