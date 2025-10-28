import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useItemState } from './itemState'
import { SESSION3_CONFIG } from '@/config/session3Config'

export const useSession3State = defineStore('session3State', () => {
  const itemState = useItemState()

  const placeholder = computed(() => {
    return itemState.affixFamilies.find((af) => af.id === SESSION3_CONFIG.PLACEHOLDER_ID) || null
  })

  const affixLevelRange = ref<[minimumLevel: number, maximumLevel: number]>([0, 0])
  const setAffixLevelRange = (value: [number, number]) => {
    affixLevelRange.value = value
  }

  const desecrated = ref(false)
  const setDesecrated = (value: boolean) => {
    desecrated.value = value
  }

  const $reset = () => {}

  return {
    placeholder,
    affixLevelRange,
    setAffixLevelRange,
    desecrated,
    setDesecrated,
    $reset,
  }
})
