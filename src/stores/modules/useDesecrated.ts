import type { Affix } from '@/utils/factory/createAffix'
import type { AffixFamily } from '@/utils/factory/createAffixFamily'
import { ABYSSAL_PLACEHOLDER_ID } from '@/utils/factory/createDesecratedAffix'
import { generateDecryptAffix } from '@/utils/pool/generateDecryptPool'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useItem } from './useItem'

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
    echoesCounts: 1,
    showModal: false,
  }

  const state = ref<Desecrated>(initState)

  const setState = (newState: Partial<Desecrated>) => {
    state.value = { ...state.value, ...newState }
  }

  const $reset = () => [setState(initState)]

  const hitAffixes = computed(() => {
    return state.value.decryptingAffixFamilies
      .map((daf) => ({ ...daf.hitAffix, desecrated: daf.desecrated }))
      .filter(Boolean)
      .sort((a) => (a.isPrefix ? -1 : 1)) as Affix[]
  })

  const _item = useItem()

  const affixFamiliesPool = ref()

  watchEffect(async () => {
    const data = await _item.currentAffixFamiliesPool
    affixFamiliesPool.value = data.normal
  })

  const reSelect = () => {
    if (state.value.echoesCounts <= 0) return

    state.value.decryptingAffixFamilies = generateDecryptAffix(
      affixFamiliesPool.value,
      _item.state.affixFamilies.filter((af) => af.id !== ABYSSAL_PLACEHOLDER_ID),
      {
        deduplication: true,
        onlyPrefix: _item.placeholder?.isPrefix,
        onlySuffix: !_item.placeholder?.isPrefix,
      },
      [state.value.minimumLevel, state.value.maximumLevel],
      3,
    )
  }

  const selectAffixFamily = (selectedAffix: Affix) => {
    const next = state.value.decryptingAffixFamilies.map((daf) => ({
      ...daf,
      desecrated: daf.hitAffix?.id === selectedAffix.id,
    }))

    setState({ decryptingAffixFamilies: next })
  }

  const isSelect = computed(() => {
    return state.value.decryptingAffixFamilies.some((daf) => daf.desecrated)
  })

  const selectedAffixFamily = computed(() => {
    return state.value.decryptingAffixFamilies.find((daf) => daf.desecrated)
  })

  const confirmSelect = () => {
    if (_item.placeholder) _item.removeAffix(_item.placeholder)
    if (selectedAffixFamily.value)
      _item.setState({
        affixFamilies: _item.state.affixFamilies.concat(selectedAffixFamily.value),
      })
    $reset()
  }

  return {
    state,
    setState,
    $reset,
    hitAffixes,
    reSelect,
    selectAffixFamily,
    selectedAffixFamily,
    isSelect,
    confirmSelect,
  }
})
