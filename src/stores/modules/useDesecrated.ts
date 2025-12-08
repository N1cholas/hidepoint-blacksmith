import type { Affix } from '@/utils/factory/createAffix'
import type { AffixFamily } from '@/utils/factory/createAffixFamily'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Desecrated = {
  decryptingAffixFamilies: AffixFamily[]
  minimumLevel: number
  maximumLevel: number
  echoesCounts: number
  showModal: boolean
}

export const useDesecrated = defineStore('desecrated', () => {
  const initState: Desecrated = {
    decryptingAffixFamilies: [],
    minimumLevel: 1,
    maximumLevel: 100,
    echoesCounts: 0,
    showModal: false,
  }

  const state = ref<Desecrated>(initState)

  const setState = (newState: Partial<Desecrated>) => {
    state.value = { ...state.value, ...newState }
  }

  const $reset = () => [
    setState(initState),
  ]

  const hitAffixes = computed(() => {
    return state.value.decryptingAffixFamilies
      .map((family) => family.hitAffix)
      .filter((affix): affix is Affix => affix !== null)
      .sort((a) => (a.isPrefix ? -1 : 1))
  })

  return { state, setState, $reset, hitAffixes }
})
