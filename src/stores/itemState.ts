import { defineStore } from 'pinia'
import {
  ITEM_TYPE,
  type Affix,
  type PropsUseHistory,
  type AffixFamily,
  MOD_GENERATION_TYPE,
} from '@/types/types'
import { computed, ref } from 'vue'
import { ITEM_CONFIG } from '@/config/itemConfig'

export const useItemState = defineStore('itemState', () => {
  const itemLevel = ref(ITEM_CONFIG.MAXIMUM_LEVEL)
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

  const affixFamilies = ref<AffixFamily[]>([])
  const affixes = ref<Affix[]>([])

  const lockedAffixId = ref<string>('')
  const setLockedAffixId = (id: string) => {
    lockedAffixId.value = id
  }
  const affixWithoutLocked = computed(() => {
    return affixes.value.filter((affix) => affix.ModFamilyList[0] !== lockedAffixId.value)
  })
  const affixFamilyWithoutLocked = computed(() => {
    return affixFamilies.value.filter((affixFamily) => affixFamily.id !== lockedAffixId.value)
  })

  const prefixCounts = computed(() => {
    return affixes.value.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.PREFIX)
      .length
  })
  const suffixCounts = computed(() => {
    return affixes.value.filter((affix) => affix.ModGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX)
      .length
  })

  const $reset = () => {
    affixFamilies.value = []
    affixes.value = []
    itemType.value = ITEM_TYPE.NORMAL
    propsHistory.value = initPropsHistory
    lockedAffixId.value = ''
    itemLevel.value = ITEM_CONFIG.MAXIMUM_LEVEL
  }

  const addAffix = (newAffixFamily: AffixFamily, newAffix: Affix) => {
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
    newAffixFamily: AffixFamily,
    affixFamilyIndex: number,
    newAffix: Affix,
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
    lockedAffixId,
    setLockedAffixId,
    affixWithoutLocked,
    affixFamilyWithoutLocked,
    prefixCounts,
    suffixCounts,
    itemLevel,
  }
})
