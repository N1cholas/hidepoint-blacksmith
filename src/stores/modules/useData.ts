import type { FileContent } from '@/scripts/normalAffixesProcessor'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import bowNormalData from '@/scripts/data/bow.json'
import quiverNormalData from '@/scripts/data/quiver.json'
import type { ItemType } from './useItem'

export const useData = defineStore('data', () => {
  const bowData = ref<FileContent>(bowNormalData)
  const quiverData = ref<FileContent>(quiverNormalData)

  const poolMap: Record<ItemType, any> = {
    bow: bowData,
    quiver: quiverData,
  }

  return {
    poolMap,
    bowData: bowData.value.normal,
    quiverData: quiverData.value.normal,
  }
})
