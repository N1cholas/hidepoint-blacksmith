import type { AffixFamily } from '../factory/createAffixFamily'
import { onlyPrefixAffixFamilies, onlySuffixAffixFamilies } from './utils'

export type GenerateRemovePoolOptions = {
  onlyAbyssal?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}

export const generateRemovePool = (
  affixFamiliesPool: AffixFamily[],
  options: GenerateRemovePoolOptions,
): AffixFamily[] => {
  const { onlyAbyssal, onlyPrefix, onlySuffix } = options

  let _affixFamiliesPool = affixFamiliesPool

  if (onlyAbyssal) {
    return _affixFamiliesPool.filter(
      // todo 两个条件应该可以合成一个
      (affixFamily) => affixFamily.desecrated || affixFamily.id === 'ABYSSAL_ID',
    )
  }

  if (onlyPrefix) {
    _affixFamiliesPool = onlyPrefixAffixFamilies(_affixFamiliesPool)
  }

  if (onlySuffix) {
    _affixFamiliesPool = onlySuffixAffixFamilies(_affixFamiliesPool)
  }

  return _affixFamiliesPool
}
