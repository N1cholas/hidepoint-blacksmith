import {
  type WeightWrapper,
  MOD_GENERATION_TYPE,
  type Affix,
  type GenerateAddPoolOptions,
  type GenerateReplacePoolOptions,
  type GenerateRemovePoolOptions,
} from '@/types/types'
import _ from 'lodash'

export const deduplicationAffixFamilies = (
  affixFamiliesPool: WeightWrapper<Affix[]>[],
  curAffixFamilies: WeightWrapper<Affix[]>[],
) => {
  const curIDs = new Set(curAffixFamilies.map((affixFamily) => affixFamily.id))
  return affixFamiliesPool.filter((affixFamily) => !curIDs.has(affixFamily.id))
}

export const filterAffixFamiliesByTags = (
  modsFamily: WeightWrapper<Affix[]>[],
  curModsFamily: WeightWrapper<Affix[]>[],
): WeightWrapper<Affix[]>[] => {
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

export const onlyPrefixAffixFamilies = (
  modsFamily: WeightWrapper<Affix[]>[],
): WeightWrapper<Affix[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )
}

export const onlySuffixAffixFamilies = (
  modsFamily: WeightWrapper<Affix[]>[],
): WeightWrapper<Affix[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  )
}

export const generateAddPool = (
  rawAffixFamiliesPool: WeightWrapper<Affix[]>[],
  curAffixFamilies: WeightWrapper<Affix[]>[],
  options: GenerateAddPoolOptions,
): WeightWrapper<Affix[]>[] => {
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
  curAffixFamilies: WeightWrapper<Affix[]>[],
  curAffixes: Affix[],
  options: GenerateReplacePoolOptions,
): WeightWrapper<Affix[]>[] => {
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
  curAffixFamilies: WeightWrapper<Affix[]>[],
  options: GenerateRemovePoolOptions,
): WeightWrapper<Affix[]>[] => {
  const { onlyAbyssal, onlyPrefix, onlySuffix } = options

  let affixFamiliesPool = curAffixFamilies

  // if (onlyAbyssal) {
  //   return []
  // }

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
