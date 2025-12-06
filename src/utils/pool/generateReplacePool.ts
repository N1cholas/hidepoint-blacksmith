import type { Affix } from '../factory/newAffix'
import type { AffixFamily } from '../factory/newAffixFamily'
import { onlyPrefixAffixFamilies, onlySuffixAffixFamilies } from './utils'

export type GenerateReplacePoolOptions = {
  lowestValue?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}

export const generateReplacePool = (
  hitAffxFamilies: AffixFamily[],
  options: GenerateReplacePoolOptions,
): AffixFamily[] => {
  const { lowestValue, onlyPrefix, onlySuffix } = options

  let _affixFamiliesPool = hitAffxFamilies

  const hitAffixes = hitAffxFamilies.map((haf) => haf.hitAffix).filter(Boolean) as Affix[]

  const allPowerLevelAreSame = hitAffixes.every((affix) => affix?.tier === hitAffixes[0]?.tier)

  // todo: test
  if (lowestValue && !allPowerLevelAreSame) {
    const selectedAffix = hitAffixes.sort((a, b) => a.tier - b.tier).pop()

    return hitAffxFamilies.filter((affixFamily) => affixFamily.id === selectedAffix?.id)
  }

  if (onlyPrefix) {
    _affixFamiliesPool = onlyPrefixAffixFamilies(_affixFamiliesPool)
  }

  if (onlySuffix) {
    _affixFamiliesPool = onlySuffixAffixFamilies(_affixFamiliesPool)
  }

  return _affixFamiliesPool
}
