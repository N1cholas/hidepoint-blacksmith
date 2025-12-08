import type { AffixFamily } from '../factory/createAffixFamily'

export const randomlyGetAffixFamily = (
  affixFamilies: AffixFamily[],
  rng: () => number = Math.random,
): AffixFamily => {
  if (!Array.isArray(affixFamilies) || affixFamilies.length === 0) {
    throw new Error('randomlyObtainAffixFamily: weightedItems is empty')
  }

  const weights = affixFamilies.map((w) => Math.max(0, Number(w.weight) || 0))

  const total = weights.reduce((s, w) => s + w, 0)

  if (total <= 0) {
    return affixFamilies[0] as AffixFamily
  }

  let r = rng() * total
  for (let i = 0; i < affixFamilies.length; i++) {
    const w = weights[i] as number
    if (w <= 0) continue
    if (r <= w) return affixFamilies[i] as AffixFamily
    r -= w
  }

  console.error('randomlyObtainAffixFamily: should not reach here')

  return affixFamilies[0] as AffixFamily
}
