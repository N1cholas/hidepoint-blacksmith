import type { Affix } from '@/utils/factory/newAffix'
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const Item_Type_Options = [
  { label: '弓', value: 'bow' },
  { label: '箭袋', value: 'quiver' },
]

export type ItemType = (typeof Item_Type_Options)[number]['value']

export const Item_Rarity_Options = [
  { label: '普通', value: 'normal' },
  { label: '魔法', value: 'magic' },
  { label: '稀有', value: 'rare' },
]

export type ItemRarity = (typeof Item_Rarity_Options)[number]['value']

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
}

export const useItem = defineStore('item', () => {
  const initState: ItemState = {
    type: 'Bow',
    rarity: 'normal',
    level: 82,
    usedProps: {
      transmutationOrb: false, // 蜕变石
      augmentationOrb: false, // 增幅石
      regalOrb: false, // 富豪石
      exaltedOrb: false, // 崇高石
    },
    affixFamilies: [],
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

  const hitAffixes = computed(() => {
    return state.value.affixFamilies
      .map((family) => family.hitAffix)
      .filter((affix) => affix !== null)
  })

  return { state, setState, $reset, counts, withoutLocked, hitAffixes }
})
