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
