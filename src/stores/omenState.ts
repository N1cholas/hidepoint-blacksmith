import { defineStore } from 'pinia'
import type { OmenConfig } from '@/types/types'
import { ref } from 'vue'

export const useOmenState = defineStore('OmenState', () => {
  const initConfig = {
    homogenisingExaltaion: false,
    sinistralExaltation: false,
    dextralExaltation: false,
    greaterExaltation: false,
  }

  const omenConfig = ref<OmenConfig>(initConfig)

  return { omenConfig }
})
