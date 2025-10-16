<script setup lang="ts">
import { useBowNormalModsFamily } from '@/stores/bowNormalMods'
import { useItemState } from '@/stores/itemState'
import { useOmenState } from '@/stores/omenState'
import { type Modifier, MOD_GENERATION_TYPE } from '@/types/types'
import {
  reverseModsFamilyWeightedRandom,
  processModsFamily,
  modFamilyWeightedRandom,
  getModifier,
} from '@/utils/utils'
import { computed } from 'vue'

defineProps<{
  name: string
  minimumLevel: number
}>()

const normalMods = useBowNormalModsFamily()
const itemState = useItemState()
const omenState = useOmenState()

const disable = computed(() => itemState.mods.length < 3)

const findIndexById = (list: any[], id: string) => list.findIndex((item) => item.id === id)

const replaceItemInArray = (array: any[], index: number, newItem: any) => {
  if (index !== -1) {
    array[index] = newItem
  }
}

const changeModifier = (minimumLevel: number) => {
  const shouldRemoveModsFamily = reverseModsFamilyWeightedRandom<Modifier[]>(itemState.modsFamily)

  const modsFamilyIndex = findIndexById(itemState.modsFamily, shouldRemoveModsFamily.id)
  const shouldRemoveModIndex = itemState.mods.findIndex(
    (mod) => mod.ModFamilyList[0] === shouldRemoveModsFamily.id,
  )

  const is6Mods = itemState.modsFamily.length === 6
  const shouldRemoveModsFamilyType = shouldRemoveModsFamily.modGenerationTypeID

  const newModsFamily = processModsFamily(normalMods.normalModsFamily, itemState.modsFamily, {
    homogenisingExaltaion: false,
    // 混沌石替换的词条可以是前缀或者后缀
    // 但是要处理6词条的情况，如果替换的是前缀，那么生成的也是前缀.如果替换的是后缀，那么生成的也是后缀。
    sinistralExaltation: is6Mods && shouldRemoveModsFamilyType === MOD_GENERATION_TYPE.PREFIX,
    dextralExaltation: is6Mods && shouldRemoveModsFamilyType === MOD_GENERATION_TYPE.SUFFIX,
  })

  if (newModsFamily.length) {
    const hitModsFamily = modFamilyWeightedRandom<Modifier[]>(newModsFamily)

    const hitMod = getModifier(hitModsFamily.items, minimumLevel)

    if (hitMod) {
      replaceItemInArray(itemState.modsFamily, modsFamilyIndex, hitModsFamily)
      replaceItemInArray(itemState.mods, shouldRemoveModIndex, hitMod)
    }
  }
}
</script>

<template>
  <button @click="changeModifier(minimumLevel)" :disabled="disable">{{ name }}</button>
</template>

<style scoped></style>
