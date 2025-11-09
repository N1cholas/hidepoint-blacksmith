import type { Affix } from './newAffix'

export type AffixFamily = WeightWrapper<Affix[]> & {
  desecrated?: boolean
  hitAffix: Affix | null
}

export const newAffixFamily = (affixes: Affix[]): AffixFamily => {
  if (!affixes[0]) {
    throw new Error('Affixes is empty')
  }

  return {
    items: affixes.map((affix, i) => ({ ...affix, powerLevel: affixes.length - i })),
    weight: affixes.reduce((acc, mod) => acc + mod.dropChance, 0),
    id: affixes[0].id,
    isPrefix: affixes[0].isPrefix,
    tags: affixes[0].tags,
    hitAffix: null,
  }
}
