import type { Affix } from './createAffix'

export type AffixFamily = WeightWrapper<Affix[]> & {
  desecrated?: boolean
  hitAffix: Affix | null
}

export const createAffixFamily = (affixes: Affix[], desecrated?: boolean): AffixFamily => {
  if (!affixes[0]) {
    throw new Error('Affixes is empty')
  }

  return {
    items: affixes.map((affix, i): Affix => ({ ...affix, tier: affixes.length - i })),
    weight: affixes.reduce((acc, mod) => acc + mod.dropChance, 0),
    id: affixes[0].id,
    isPrefix: affixes[0].isPrefix,
    tags: affixes[0].tags,
    hitAffix: null,
    desecrated,
  }
}
