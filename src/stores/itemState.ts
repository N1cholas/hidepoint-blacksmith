import { defineStore } from 'pinia'
import type { Modifier, WeightWrapper } from '@/types/types'
import { ref } from 'vue'

export const useItemState = defineStore('itemState', () => {
  const affixFamilies = ref<WeightWrapper<Modifier[]>[]>([])
  const affixes = ref<Modifier[]>([])

  const $reset = () => {
    affixFamilies.value = []
    affixes.value = []
  }

  const addAffix = (newAffixFamily: WeightWrapper<Modifier[]>, newAffix: Modifier) => {
    if (!newAffixFamily || !newAffix)
      return console.error('addMods: newModsFamily or newMods is null')

    affixFamilies.value.push(newAffixFamily)
    affixes.value.push(newAffix)
  }

  const findIndexById = (id: string): [modsFamilyIndex: number, modsIndex: number] => [
    affixFamilies.value.findIndex((item) => item.id === id),
    affixes.value.findIndex((mod) => mod.ModFamilyList[0] === id),
  ]

  const replaceAffix = (
    newAffixFamily: WeightWrapper<Modifier[]>,
    affixFamilyIndex: number,
    newAffix: Modifier,
    affixIndex: number,
  ) => {
    if (!newAffixFamily || !newAffix)
      return console.error('replaceMods: newModsFamily or newMods is null')

    affixFamilies.value[affixFamilyIndex] = newAffixFamily
    affixes.value[affixIndex] = newAffix
  }

  return {
    affixFamilies,
    affixes,
    $reset,
    addAffix,
    findIndexById,
    replaceAffix,
  }
})
