import { defineStore } from 'pinia'
import type { Modifier, WeightWrapper } from '@/types/types'
import { ref } from 'vue'

export const useItemState = defineStore('itemState', () => {
  const modsFamily = ref<WeightWrapper<Modifier[]>[]>([])
  const mods = ref<Modifier[]>([])

  const $reset = () => {
    modsFamily.value = []
    mods.value = []
  }

  return { modsFamily, mods, $reset }
})
