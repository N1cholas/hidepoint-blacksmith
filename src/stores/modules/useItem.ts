import type { Affix } from '@/utils/factory/newAffix'
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
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
  lockedAffix?: Affix
  config: {
    affixCounts: [number, number] // [prefixCount, suffixCount]
  }
}

export const useItem = defineStore('item', () => {
  const initState: ItemState = {
    type: 'bow',
    rarity: 'normal',
    level: 82,
    usedProps: {
      transmutationOrb: false, // 蜕变石
      augmentationOrb: false, // 增幅石
      regalOrb: false, // 富豪石
      exaltedOrb: false, // 崇高石
    },
    affixFamilies: [],
    config: {
      affixCounts: [3, 3],
    },
  }

  const state = ref<ItemState>(initState)

  const setState = (newState: Partial<ItemState>) => {
    state.value = { ...state.value, ...newState }
  }

  const $reset = () => (state.value = { ...initState })

  const counts = computed(() => {
    let prefixCount = 0
    let suffixCount = 0
    state.value.affixFamilies.forEach((family) => {
      if (family.isPrefix) {
        prefixCount += 1
      } else {
        suffixCount += 1
      }
    })
    return { prefixCount, suffixCount }
  })

  const withoutLocked = computed(() => {
    if (!state.value.lockedAffix) {
      return state.value.affixFamilies
    }
    return state.value.affixFamilies.filter((family) => family.id !== state.value.lockedAffix?.id)
  })

  const affixDataPool = new Map<ItemType, Promise<any>>([
    ['bow', import('@/scripts/data/bow.json')],
    ['quiver', import('@/scripts/data/quiver.json')],
  ])

  const hitAffixes = computed(() => {
    return state.value.affixFamilies
      .map((family) => family.hitAffix)
      .filter((affix): affix is Affix => affix !== null)
      .sort((a) => (a.isPrefix ? -1 : 1))
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

  const addAffix = (newAffixFamily: AffixFamily, newAffix: Affix) => {
    if (!newAffixFamily || !newAffix)
      return console.error('addMods: newModsFamily or newMods is null')

    state.value.affixFamilies.push({ ...newAffixFamily, hitAffix: newAffix })
  }

  return {
    state,
    setState,
    $reset,
    counts,
    withoutLocked,
    hitAffixes,
    currentAffixFamiliesPool,
    addAffix,
  }
})
