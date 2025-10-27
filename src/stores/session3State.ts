import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useItemState } from './itemState'
import { SESSION3_CONFIG } from '@/config/session3Config'

export const useSession3State = defineStore('session3State', () => {
  const itemState = useItemState()

  const desecrated = computed(() => {
    console.log(
      itemState.affixFamilies.filter(
        (affixFamily) => affixFamily.id === SESSION3_CONFIG.PLACEHOLDER_ID,
      ),
    )
    return (
      itemState.affixFamilies.filter(
        (affixFamily) => affixFamily.id === SESSION3_CONFIG.PLACEHOLDER_ID,
      ).length > 0
    )
  })

  const $reset = () => {}

  return {
    desecrated,
    $reset,
  }
})
