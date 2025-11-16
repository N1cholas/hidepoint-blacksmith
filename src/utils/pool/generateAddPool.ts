import type { AffixFamily } from '../factory/newAffixFamily'

export const deduplicationAffixFamilies = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
) => {
  const curIDs = new Set(curAffixFamilies.map((affixFamily) => affixFamily.id))

  return affixFamiliesPool.filter((affixFamily) => !curIDs.has(affixFamily.id))
}

export const filterAffixFamiliesByTags = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
): AffixFamily[] => {
  if (curAffixFamilies.length >= 6) return []

  const curTagSet = new Set<string>()
  curAffixFamilies.forEach((af) => {
    if (af.tags) af.tags.forEach((tag) => curTagSet.add(tag))
  })

  // 处理词条的tag为空的情况
  if (curTagSet.size === 0) return affixFamiliesPool

  const filtered = affixFamiliesPool.filter((mod) => mod.tags?.some((tag) => curTagSet.has(tag)))

  // 处理没有找到符合tag的词条的情况，例如弓的敏捷词条等
  return filtered.length ? filtered : affixFamiliesPool
}

export const onlyPrefixAffixFamilies = (curAffixFamilies: AffixFamily[]) => {
  return curAffixFamilies.filter((af) => af.isPrefix)
}

export const onlySuffixAffixFamilies = (curAffixFamilies: AffixFamily[]) => {
  return curAffixFamilies.filter((af) => !af.isPrefix)
}

export type GenerateAddPoolOptions = {
  deduplication: boolean
  filterByTags: boolean
  onlyPrefix: boolean
  onlySuffix: boolean
}

export const generateAddPool = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
  options: Partial<GenerateAddPoolOptions>,
): AffixFamily[] => {
  const { deduplication, filterByTags, onlyPrefix, onlySuffix } = options

  let _affixFamiliesPool = affixFamiliesPool

  if (deduplication) {
    _affixFamiliesPool = deduplicationAffixFamilies(_affixFamiliesPool, curAffixFamilies)
  }

  if (filterByTags) {
    _affixFamiliesPool = filterAffixFamiliesByTags(_affixFamiliesPool, curAffixFamilies)
  }

  if (onlyPrefix) {
    _affixFamiliesPool = onlyPrefixAffixFamilies(_affixFamiliesPool)
  }

  if (onlySuffix) {
    _affixFamiliesPool = onlySuffixAffixFamilies(_affixFamiliesPool)
  }

  return _affixFamiliesPool
}

// export const generateReplacePool = (
//   curAffixFamilies: AffixFamily[],
//   curAffixes: Affix[],
//   options: GenerateReplacePoolOptions,
// ): AffixFamily[] => {
//   const { lowestValue, onlyPrefix, onlySuffix } = options

//   let affixFamiliesPool = curAffixFamilies

//   const allPowerLevelAreSame = curAffixes.every(
//     (affix) => affix.powerLevel === curAffixes[0].powerLevel,
//   )

//   if (lowestValue && !allPowerLevelAreSame) {
//     const selectedAffix = curAffixes.sort((a, b) => b.powerLevel - a.powerLevel)[0]
//     return curAffixFamilies.filter(
//       (affixFamily) => affixFamily.id === selectedAffix.ModFamilyList[0],
//     )
//   }

//   if (onlyPrefix) {
//     affixFamiliesPool = affixFamiliesPool.filter(
//       (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
//     )
//   }

//   if (onlySuffix) {
//     affixFamiliesPool = affixFamiliesPool.filter(
//       (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
//     )
//   }

//   return affixFamiliesPool
// }

// export const generateRemovePool = (
//   curAffixFamilies: AffixFamily[],
//   options: GenerateRemovePoolOptions,
// ): AffixFamily[] => {
//   const { onlyAbyssal, onlyPrefix, onlySuffix } = options

//   let affixFamiliesPool = curAffixFamilies

//   if (onlyAbyssal) {
//     return affixFamiliesPool.filter(
//       (affixFamily) => affixFamily.desecrated || affixFamily.id === SESSION3_CONFIG.PLACEHOLDER_ID,
//     )
//   }

//   if (onlyPrefix) {
//     affixFamiliesPool = affixFamiliesPool.filter(
//       (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
//     )
//   }

//   if (onlySuffix) {
//     affixFamiliesPool = affixFamiliesPool.filter(
//       (affixFamily) => affixFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
//     )
//   }

//   return affixFamiliesPool
// }
