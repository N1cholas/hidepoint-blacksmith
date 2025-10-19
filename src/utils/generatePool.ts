import {
  type WeightWrapper,
  MOD_GENERATION_TYPE,
  type Modifier,
  type GenerateAddPoolOptions,
  type GenerateReplacePoolOptions,
  type GenerateRemovePoolOptions,
} from '@/types/types'
import _ from 'lodash'

export const deduplicationAffixFamilies = (
  affixFamiliesPool: WeightWrapper<Modifier[]>[],
  curAffixFamilies: WeightWrapper<Modifier[]>[],
) => {
  const curIDs = new Set(curAffixFamilies.map((affixFamily) => affixFamily.id))
  return affixFamiliesPool.filter((affixFamily) => !curIDs.has(affixFamily.id))
}

export const filterAffixFamiliesByTags = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
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
  modsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )
}

export const onlySuffixAffixFamilies = (
  modsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  )
}

export const generateAddPool = (
  rawAffixFamiliesPool: WeightWrapper<Modifier[]>[],
  curAffixFamilies: WeightWrapper<Modifier[]>[],
  options: GenerateAddPoolOptions,
): WeightWrapper<Modifier[]>[] => {
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
  curAffixFamilies: WeightWrapper<Modifier[]>[],
  curAffixes: Modifier[],
  options: GenerateReplacePoolOptions,
): WeightWrapper<Modifier[]>[] => {
  const { lowestValue, onlyPrefix, onlySuffix } = options

  let affixFamiliesPool = curAffixFamilies

  const allPowerLevelAreSame = curAffixes.every(
    (affix) => affix.powerLevel === curAffixes[0].powerLevel,
  )

  if (lowestValue && !allPowerLevelAreSame) {
    const selectedAffix = curAffixes.sort((a, b) => b.powerLevel - a.powerLevel).slice(0, 1)[0]
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
  curAffixFamilies: WeightWrapper<Modifier[]>[],
  options: GenerateRemovePoolOptions,
): WeightWrapper<Modifier[]>[] => {
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
