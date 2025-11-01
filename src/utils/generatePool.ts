import { SESSION3_CONFIG } from '@/config/session3Config'
import {
  MOD_GENERATION_TYPE,
  type Affix,
  type GenerateAddPoolOptions,
  type GenerateReplacePoolOptions,
  type GenerateRemovePoolOptions,
  type AffixFamily,
} from '@/types/types'
import _ from 'lodash'

export const deduplicationAffixFamilies = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
) => {
  const curIDs = new Set(curAffixFamilies.map((affixFamily) => affixFamily.id))
  return affixFamiliesPool.filter((affixFamily) => !curIDs.has(affixFamily.id))
}

export const filterAffixFamiliesByTags = (
  modsFamily: AffixFamily[],
  curModsFamily: AffixFamily[],
): AffixFamily[] => {
  if (curModsFamily.length >= 6) return []

  const curTagSet = new Set<string>()
  curModsFamily.forEach((mod) => {
    if (mod.tags) mod.tags.forEach((tag) => curTagSet.add(tag))
  })

  // 处理词条的tag为空的情况
  if (curTagSet.size === 0) return modsFamily

  const filtered = modsFamily.filter((mod) => mod.tags?.some((tag) => curTagSet.has(tag)))

  // 处理没有找到符合tag的词条的情况，例如弓的敏捷词条等
  return filtered.length ? filtered : modsFamily
}

export const onlyPrefixAffixFamilies = (modsFamily: AffixFamily[]): AffixFamily[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )
}

export const onlySuffixAffixFamilies = (modsFamily: AffixFamily[]): AffixFamily[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  )
}

export const generateAddPool = (
  rawAffixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
  options: GenerateAddPoolOptions,
): AffixFamily[] => {
  const { deduplication, filterByTags, onlyPrefix, onlySuffix } = options

  let affixFamiliesPool = rawAffixFamiliesPool

  if (deduplication) {
    affixFamiliesPool = deduplicationAffixFamilies(affixFamiliesPool, curAffixFamilies)
  }

  if (filterByTags) {
    affixFamiliesPool = filterAffixFamiliesByTags(affixFamiliesPool, curAffixFamilies)
  }

  if (onlyPrefix) {
    affixFamiliesPool = onlyPrefixAffixFamilies(affixFamiliesPool)
  }

  if (onlySuffix) {
    affixFamiliesPool = onlySuffixAffixFamilies(affixFamiliesPool)
  }

  return affixFamiliesPool
}

export const generateReplacePool = (
  curAffixFamilies: AffixFamily[],
  curAffixes: Affix[],
  options: GenerateReplacePoolOptions,
): AffixFamily[] => {
  const { lowestValue, onlyPrefix, onlySuffix } = options

  let affixFamiliesPool = curAffixFamilies

  const allPowerLevelAreSame = curAffixes.every(
    (affix) => affix.powerLevel === curAffixes[0].powerLevel,
  )

  if (lowestValue && !allPowerLevelAreSame) {
    const selectedAffix = curAffixes.sort((a, b) => b.powerLevel - a.powerLevel)[0]
    return curAffixFamilies.filter(
      (affixFamily) => affixFamily.id === selectedAffix.ModFamilyList[0],
    )
  }

  if (onlyPrefix) {
    affixFamiliesPool = affixFamiliesPool.filter(
      (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
    )
  }

  if (onlySuffix) {
    affixFamiliesPool = affixFamiliesPool.filter(
      (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
    )
  }

  return affixFamiliesPool
}

export const generateRemovePool = (
  curAffixFamilies: AffixFamily[],
  options: GenerateRemovePoolOptions,
): AffixFamily[] => {
  const { onlyAbyssal, onlyPrefix, onlySuffix } = options

  let affixFamiliesPool = curAffixFamilies

  if (onlyAbyssal) {
    return affixFamiliesPool.filter(
      (affixFamily) => affixFamily.desecrated || affixFamily.id === SESSION3_CONFIG.PLACEHOLDER_ID,
    )
  }

  if (onlyPrefix) {
    affixFamiliesPool = affixFamiliesPool.filter(
      (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
    )
  }

  if (onlySuffix) {
    affixFamiliesPool = affixFamiliesPool.filter(
      (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
    )
  }

  return affixFamiliesPool
}
