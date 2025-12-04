import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOmen = defineStore('OmenState', () => {
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
    // session3 ----------------------------------------------------------
    // 深渊回响
    abyssalEchoes: false,
    // 左旋死灵术
    sinistralNecromancy: false,
    // 右旋死灵术
    dextralNecromancy: false,
    // 光明
    light: false,
    // session3 ----------------------------------------------------------
  }

  const config = ref<OmenConfig>(initConfig)

  const setConfig = (newConfig: Partial<OmenConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  return { config, setConfig }
})
