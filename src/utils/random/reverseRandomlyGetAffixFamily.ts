import type { AffixFamily } from '../factory/createAffixFamily'

export const reverseRandomlyGetAffixFamily = (
  affixFamilies: AffixFamily[],
  rng: () => number = Math.random,
  epsilon = 1e-4,
): AffixFamily => {
  if (!Array.isArray(affixFamilies) || affixFamilies.length === 0) {
    throw new Error('reverseRandomlyGetAffixFamily: affixFamilies is empty')
  }

  const invWeights = affixFamilies.map((w) => {
    const raw = Number((w as any).weight)
    const safe = Number.isFinite(raw) ? Math.abs(raw) : 0
    const base = Math.max(safe, epsilon)
    return 1 / base
  })

  const total = invWeights.reduce((s, w) => s + w, 0)
  if (!Number.isFinite(total) || total <= 0) {
    return affixFamilies[0] as AffixFamily
  }

  let r = rng() * total
  for (let i = 0; i < affixFamilies.length; i++) {
    const w = invWeights[i] as number
    if (w <= 0) continue
    if (r <= w) return affixFamilies[i] as AffixFamily
    r -= w
  }

  console.error('reverseRandomlyObtainAffixFamily: should not reach here')
  return affixFamilies[affixFamilies.length - 1] as AffixFamily
}
