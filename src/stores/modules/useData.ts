import type { FileContent } from '@/scripts/normalAffixesProcessor'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import bowNormalData from '@/scripts/data/bow.json'

export const useData = defineStore('data', () => {
  const bowData = ref<FileContent>(bowNormalData)

  return {
    bowData: bowData.value.normal,
  }
})
