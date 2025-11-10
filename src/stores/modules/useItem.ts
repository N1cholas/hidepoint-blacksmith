import type { Affix } from '@/utils/factory/newAffix'
import type { AffixFamily } from '@/utils/factory/newAffixFamily'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export enum ITEM_TYPE {
  BOW = 'BOW',
}

export type UsedProps = {
  transmutationOrb: boolean
  augmentationOrb: boolean
  regalOrb: boolean
  exaltedOrb: boolean
}

export type ItemState = {
  name: string | null
  type: ITEM_TYPE | null
  usedProps: UsedProps
  affixFamilies: AffixFamily[]
  lockedAffix?: Affix
}

export const useItemState = defineStore('itemState', () => {
  const initState = {
    name: null,
    type: null,
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

  const rarity = computed(() => {
    const { transmutationOrb, augmentationOrb, regalOrb, exaltedOrb } = state.value.usedProps
    if (exaltedOrb) return 'rare'
    if (regalOrb) return 'rare'
    if (augmentationOrb) return 'magic'
    if (transmutationOrb) return 'magic'
    return 'normal'
  })

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

  return { state, setState, $reset, rarity, counts, withoutLocked }
})
