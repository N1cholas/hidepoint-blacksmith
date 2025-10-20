import { defineStore } from 'pinia'
import {
  ITEM_TYPE,
  type ItemConfig,
  type Modifier,
  type PropsUseHistory,
  type WeightWrapper,
} from '@/types/types'
import { ref } from 'vue'

export const useItemState = defineStore('itemState', () => {
  const itemType = ref<ITEM_TYPE>(ITEM_TYPE.NORMAL)
  const setItemType = (newType: ITEM_TYPE) => {
    itemType.value = newType
  }

  const initPropsHistory = {
    transmutationOrb: false,
    augmentationOrb: false,
    regalOrb: false,
    exaltedOrb: false,
  }
  const propsHistory = ref<PropsUseHistory>(initPropsHistory)
  const setPropsHistory = (newPropsHistory: Partial<PropsUseHistory>) => {
    propsHistory.value = { ...propsHistory.value, ...newPropsHistory }
  }

  const config = ref<ItemConfig>({
    prefixNum: 3,
    suffixNum: 3,
  })

  const affixFamilies = ref<WeightWrapper<Modifier[]>[]>([])
  const affixes = ref<Modifier[]>([])

  const $reset = () => {
    affixFamilies.value = []
    affixes.value = []
    itemType.value = ITEM_TYPE.NORMAL
    propsHistory.value = initPropsHistory
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

  const removeAffix = (affixIndex: number, affixFamilyIndex: number) => {
    affixes.value.splice(affixIndex, 1)
    affixFamilies.value.splice(affixFamilyIndex, 1)
  }

  return {
    itemType,
    setItemType,
    propsHistory,
    setPropsHistory,
    affixFamilies,
    affixes,
    $reset,
    addAffix,
    findIndexById,
    replaceAffix,
    removeAffix,
    config,
  }
})
