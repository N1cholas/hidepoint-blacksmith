import { defineStore } from 'pinia'
import bow_normal_mods from '../data/bow_normal_mods.json'
import type { AffixFamily } from '@/types/types'

export const useBowNormalModsFamily = defineStore('bowNormalModsFamily', () => {
  const normalModsFamily = bow_normal_mods.normal as AffixFamily[]

  return { normalModsFamily }
})
