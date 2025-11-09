import type { FileContent } from '@/scripts/normalAffixesProcessor'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import bowNormalData from '@/scripts/data/bow.json'

export const useData = defineStore('useData', () => {
  const bowData = ref<FileContent>(bowNormalData)

  return { bowData: bowData.value.normal }
})
