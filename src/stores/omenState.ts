import { defineStore } from 'pinia'
import type { OmenConfig } from '@/types/types'
import { ref } from 'vue'

export const useOmenState = defineStore('OmenState', () => {
  const omenConfig = ref<OmenConfig>({
    homogenisingExaltaion: false,
  })

  return { omenConfig }
})
