import { defineStore } from 'pinia'
import type { OmenConfig } from '@/types/types'
import { ref } from 'vue'

export const useOmenState = defineStore('OmenState', () => {
  const initConfig = {
    // 崇高同质化
    homogenisingExaltaion: false,
    // 崇高左旋
    sinistralExaltation: false,
    // 崇高右旋
    dextralExaltation: false,
    // 崇高强效
    greaterExaltation: false,
    // 富豪同质化
    homogenisingCoronation: false,
  }

  const omenConfig = ref<OmenConfig>(initConfig)

  return { omenConfig }
})
