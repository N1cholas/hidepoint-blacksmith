import type { Affix } from '../factory/createAffix'

export const randomlyGetAffix = (
  affixes: Affix[],
  minimumLevel: number,
  maximumLevel: number,
  rng: () => number = Math.random,
): Affix => {
  if (!Array.isArray(affixes) || affixes.length === 0) {
    throw new Error('randomlyObtainAffix: affixes is empty')
  }

  if (maximumLevel < minimumLevel) {
    throw new Error('randomlyObtainAffix: maximumLevel is less than minimumLevel')
  }

  const filtered = affixes.filter((a) => a.level >= minimumLevel && a.level <= maximumLevel)
  // 没有找到符合的池子，就使用默认池子
  const pool = filtered.length ? filtered : affixes

  const weights = pool.map((a) => Math.max(0, Number(a.dropChance) || 0))
  const total = weights.reduce((s, w) => s + w, 0)

  if (total <= 0) return pool[0] as Affix

  let r = rng() * total
  for (let i = 0; i < pool.length; i++) {
    const w = weights[i] as number
    if (w <= 0) continue
    if (r <= w) return pool[i] as Affix
    r -= w
  }

  console.error('randomlyObtainAffix: should not reach here')

  return pool[0] as Affix
}
