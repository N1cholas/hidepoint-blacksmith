import { ITEM_CONFIG } from '@/config/itemConfig'
import type { WeightWrapper, Affix } from '@/types/types'

// todo:性能优化
export const randomlyObtainAffixFamily = <T>(
  weightedItems: WeightWrapper<T>[],
  rng: () => number = Math.random,
): WeightWrapper<T> => {
  if (!Array.isArray(weightedItems) || weightedItems.length === 0) {
    throw new Error('randomlyObtainAffixFamily: weightedItems is empty')
  }

  const weights = weightedItems.map((w) => Math.max(0, Number(w.weight) || 0))
  const total = weights.reduce((s, w) => s + w, 0)

  if (total <= 0) {
    return weightedItems[0]
  }

  let r = rng() * total
  for (let i = 0; i < weightedItems.length; i++) {
    const w = weights[i]
    if (w <= 0) continue
    if (r <= w) return weightedItems[i]
    r -= w
  }

  console.error('randomlyObtainAffixFamily: should not reach here')
  return weightedItems[0]
}

export const reverseRandomlyObtainAffixFamily = <T>(
  weightedItems: WeightWrapper<T>[],
  rng: () => number = Math.random,
  epsilon = 1e-4,
): WeightWrapper<T> => {
  if (!Array.isArray(weightedItems) || weightedItems.length === 0) {
    throw new Error('reverseRandomlyObtainAffixFamily: weightedItems is empty')
  }

  const invWeights = weightedItems.map((w) => {
    const raw = Number((w as any).weight)
    const safe = Number.isFinite(raw) ? Math.abs(raw) : 0
    const base = Math.max(safe, epsilon)
    return 1 / base
  })

  const total = invWeights.reduce((s, w) => s + w, 0)
  if (!Number.isFinite(total) || total <= 0) {
    return weightedItems[0]
  }

  let r = rng() * total
  for (let i = 0; i < weightedItems.length; i++) {
    const w = invWeights[i]
    if (w <= 0) continue
    if (r <= w) return weightedItems[i]
    r -= w
  }

  console.error('reverseRandomlyObtainAffixFamily: should not reach here')
  return weightedItems[weightedItems.length - 1]
}

export const randomlyObtainAffix = (
  affixes: Affix[],
  minimumLevel: number = ITEM_CONFIG.MINIMUM_LEVEL,
  maximumLevel: number = ITEM_CONFIG.MAXIMUM_LEVEL,
  rng: () => number = Math.random,
): Affix => {
  if (!Array.isArray(affixes) || affixes.length === 0) {
    throw new Error('randomlyObtainAffix: affixes is empty')
  }

  if (maximumLevel < minimumLevel) {
    throw new Error('randomlyObtainAffix: maximumLevel is less than minimumLevel')
  }

  const filtered = affixes.filter((a) => a.Level >= minimumLevel && a.Level <= maximumLevel)
  // 没有找到符合的池子，就使用默认池子
  const pool = filtered.length ? filtered : affixes

  const weights = pool.map((a) => Math.max(0, Number(a.DropChance) || 0))
  const total = weights.reduce((s, w) => s + w, 0)

  if (total <= 0) return pool[0]

  let r = rng() * total
  for (let i = 0; i < pool.length; i++) {
    const w = weights[i]
    if (w <= 0) continue
    if (r <= w) return pool[i]
    r -= w
  }

  console.error('randomlyObtainAffix: should not reach here')

  return pool[0]
}
