import type { Affix } from '@/utils/factory/createAffix'
import type { AffixFamily } from '@/utils/factory/createAffixFamily'
import { ABYSSAL_PLACEHOLDER_ID } from '@/utils/factory/createDesecratedAffix'
import { randomlyGetAffix } from '@/utils/random/randomlyGetAffix'
import { randomlyGetAffixFamily } from '@/utils/random/randomlyGetAffixFamily'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const Item_Type_Options: { label: string; value: ItemType }[] = [
  { label: '弓', value: 'bow' },
  { label: '箭袋', value: 'quiver' },
]

export type ItemType = 'bow' | 'quiver'

export const Item_Rarity_Options: { label: string; value: ItemRarity }[] = [
  { label: '普通', value: 'normal' },
  { label: '魔法', value: 'magic' },
  { label: '稀有', value: 'rare' },
]

export type ItemRarity = 'normal' | 'magic' | 'rare'

export type UsedProps = {
  transmutationOrb: boolean
  augmentationOrb: boolean
  regalOrb: boolean
  exaltedOrb: boolean
}

export type ItemState = {
  type: ItemType
  rarity: ItemRarity
  level: number
  usedProps: UsedProps
  affixFamilies: AffixFamily[]
  lockedAffix: Affix | null
}

export const ITEM_CONFIG = {
  PREFIX_COUNT_LIMIT: 3,
  SUFFIX_COUNT_LIMIT: 3,
}

export const useItem = defineStore('item', () => {
  const initState: ItemState = {
    type: 'bow',
    rarity: 'normal',
    level: 82,
    usedProps: {
      transmutationOrb: false,
      augmentationOrb: false,
      regalOrb: false,
      exaltedOrb: false,
    },
    affixFamilies: [],
    lockedAffix: null,
  }

  const state = ref<ItemState>(initState)

  const setState = (newState: Partial<ItemState>) => {
    state.value = { ...state.value, ...newState }
  }

  const $reset = () => (state.value = initState)

  const isPrefixFull = computed(() => {
    const prefixCount = state.value.affixFamilies.filter(
      (af) => af.hitAffix && af.hitAffix.isPrefix,
    ).length
    return prefixCount >= ITEM_CONFIG.PREFIX_COUNT_LIMIT
  })

  const isSuffixFull = computed(() => {
    const suffixCount = state.value.affixFamilies.filter(
      (af) => af.hitAffix && !af.hitAffix.isPrefix,
    ).length
    return suffixCount >= ITEM_CONFIG.SUFFIX_COUNT_LIMIT
  })

  const withoutLocked = computed(() => {
    if (!state.value.lockedAffix) {
      return state.value.affixFamilies
    }
    return state.value.affixFamilies.filter((af) => af.id !== state.value.lockedAffix?.id)
  })

  const affixDataPool = new Map<ItemType, Promise<any>>([
    ['bow', import('@/scripts/data/bow.json')],
    ['quiver', import('@/scripts/data/quiver.json')],
  ])

  const hitAffixes = computed(() => {
    return state.value.affixFamilies
      .map((af) => ({ ...af.hitAffix, desecrated: af.desecrated }))
      .filter(Boolean)
      .sort((a) => (a.isPrefix ? -1 : 1)) as Affix[]
  })

  const currentAffixFamiliesPool = computed(async () => {
    const curType = state.value.type

    if (!curType || !affixDataPool.has(curType)) {
      console.warn(`No data pool found for type: ${curType}`)
      return null
    }

    try {
      const data = await affixDataPool.get(curType)
      return data.default
    } catch (error) {
      console.error(`Failed to load data for type: ${curType}`, error)
      return null
    }
  })

  const randomlyAddAffix = (
    affixFamiliesPool: AffixFamily[],
    minimumLevel: number,
    maximumLevel: number,
    nextRarity: ItemRarity,
    usedProp?: keyof UsedProps,
  ) => {
    const hitAffixFamily = randomlyGetAffixFamily(affixFamiliesPool)
    const hitAffix = randomlyGetAffix(hitAffixFamily.items, minimumLevel, maximumLevel)

    if (hitAffix) {
      if (!hitAffixFamily || !hitAffix)
        return console.error('addMods: newModsFamily or newMods is null')

      setState({
        affixFamilies: state.value.affixFamilies.concat({ ...hitAffixFamily, hitAffix }),
        rarity: nextRarity,
        usedProps: usedProp
          ? { ...state.value.usedProps, [usedProp]: true }
          : state.value.usedProps,
      })
    }
  }

  const removeAffix = (removeAffixFamily: AffixFamily) => {
    const affixFamilies = state.value.affixFamilies.filter(
      (affixFamily) => affixFamily.id !== removeAffixFamily.id,
    )
    // 移除锁定的词缀仅在初始化基底时使用
    const lockedAffix =
      state.value.lockedAffix?.id === removeAffixFamily.id ? undefined : state.value.lockedAffix

    setState({
      affixFamilies,
      lockedAffix,
    })
  }

  const AFFIX_COUNTS = computed(() => {
    return ITEM_CONFIG.PREFIX_COUNT_LIMIT + ITEM_CONFIG.SUFFIX_COUNT_LIMIT
  })

  const placeholder = computed(() => {
    return state.value.affixFamilies.find((af) => af.id === ABYSSAL_PLACEHOLDER_ID) || null
  })

  const desecrated = computed(() => {
    return state.value.affixFamilies.find((af) => af.desecrated) || null
  })

  const getCurrentAffixesWeights = (): number => {
    const currentAffixFamilies = state.value.affixFamilies

    if (currentAffixFamilies.length === 0) {
      return 0
    }

    const result = Math.round(
      currentAffixFamilies.reduce((sum, af) => sum + af.weight, 0) / currentAffixFamilies.length,
    )

    return result
  }

  return {
    state,
    setState,
    $reset,
    isPrefixFull,
    isSuffixFull,
    withoutLocked,
    hitAffixes,
    currentAffixFamiliesPool,
    randomlyAddAffix,
    removeAffix,
    AFFIX_COUNTS,
    placeholder,
    desecrated,
    getCurrentAffixesWeights,
  }
})
