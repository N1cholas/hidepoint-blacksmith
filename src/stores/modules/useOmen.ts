import { defineStore } from 'pinia'
import { ref } from 'vue'

export type OmenConfig = {
  // 崇高
  homogenisingExaltaion: boolean
  sinistralExaltation: boolean
  dextralExaltation: boolean
  greaterExaltation: boolean
  // 富豪
  homogenisingCoronation: boolean
  // 混沌
  whittling: boolean
  sinistralErasure: boolean
  dextralErasure: boolean
  // 剥离
  sinistralAnnulment: boolean
  dextralAnnulment: boolean
  // 深渊
  abyssalEchoes: boolean
  sinistralNecromancy: boolean
  dextralNecromancy: boolean
  light: boolean
  // 精华
  sinistralCrystallisation: boolean
  dextralCrystallisation: boolean
}

export const useOmen = defineStore('omen', () => {
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
    // 消减
    whittling: false,
    // 左旋消抹
    sinistralErasure: false,
    // 右旋消抹
    dextralErasure: false,
    // 左旋剥离
    sinistralAnnulment: false,
    // 右旋剥离
    dextralAnnulment: false,
    // 深渊回响
    abyssalEchoes: false,
    // 左旋死灵术
    sinistralNecromancy: false,
    // 右旋死灵术
    dextralNecromancy: false,
    // 光明
    light: false,
    // 左旋结晶
    sinistralCrystallisation: false,
    // 右旋结晶
    dextralCrystallisation: false,
  }

  const config = ref<OmenConfig>(initConfig)

  const setConfig = (newConfig: Partial<OmenConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  return { config, setConfig }
})
