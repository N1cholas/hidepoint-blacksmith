import type { AffixFamily } from '../factory/newAffixFamily'
import {
  deduplicationAffixFamilies,
  filterAffixFamiliesByTags,
  onlyPrefixAffixFamilies,
  onlySuffixAffixFamilies,
} from './utils'

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
