import { defineStore } from 'pinia'
import type { Modifier, WeightWrapper } from '@/types/types'
import { ref } from 'vue'

export const useItemState = defineStore('itemState', () => {
  const modsFamily = ref<WeightWrapper<Modifier[]>[]>([])
  const mods = ref<Modifier[]>([])

  const $reset = () => {
    modsFamily.value = []
    mods.value = []
  }

  const addMods = (newModsFamily: WeightWrapper<Modifier[]>, newMods: Modifier) => {
    if (!newModsFamily || !newMods)
      return console.error('addMods: newModsFamily or newMods is null')

    modsFamily.value.push(newModsFamily)
    mods.value.push(newMods)
  }

  const findIndexById = (id: string): [modsFamilyIndex: number, modsIndex: number] => [
    modsFamily.value.findIndex((item) => item.id === id),
    mods.value.findIndex((mod) => mod.ModFamilyList[0] === id),
  ]

  const replaceMods = (
    newModsFamily: WeightWrapper<Modifier[]>,
    replaceModsFamilyIndex: number,
    newMods: Modifier,
    replaceModsIndex: number,
  ) => {
    if (!newModsFamily || !newMods)
      return console.error('replaceMods: newModsFamily or newMods is null')

    modsFamily.value[replaceModsFamilyIndex] = newModsFamily
    mods.value[replaceModsIndex] = newMods
  }

  return { modsFamily, mods, $reset, addMods, findIndexById, replaceMods }
})
