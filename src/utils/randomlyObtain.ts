import type { WeightWrapper, Affix } from '@/types/types'

// todo:性能优化
export const randomlyObtainAffixFamily = <T>(
  weightedItems: WeightWrapper<T>[],
): WeightWrapper<T> => {
  const total = weightedItems.reduce((sum, i) => sum + i.weight, 0)
  const random = Math.random() * total

  let cumulativeWeight = 0

  for (const weightedItem of weightedItems) {
    cumulativeWeight += weightedItem.weight
    if (random <= cumulativeWeight) {
      return weightedItem
    }
  }

  return weightedItems[weightedItems.length - 1]
}

export const reverseRandomlyObtainAffixFamily = <T>(
  weightedItems: WeightWrapper<T>[],
): WeightWrapper<T> => {
  const totalInverseWeight = weightedItems.reduce(
    (sum, item) => sum + 1 / Math.max(item.weight, 0.0001),
    0,
  )
  let random = Math.random() * totalInverseWeight

  for (const item of weightedItems) {
    const inverseWeight = 1 / Math.max(item.weight, 0.0001)
    if (random < inverseWeight) return item
    random -= inverseWeight
  }

  return weightedItems[weightedItems.length - 1]
}

export const randomlyObtainAffix = (mods: Affix[], minimumLevel: number): Affix => {
  const total = mods.reduce((sum, i) => sum + i.DropChance, 0)
  const random = Math.random() * total

  let cumulativeWeight = 0

  const filteredMods = mods.filter((mod) => mod.Level >= minimumLevel)

  for (const mod of filteredMods) {
    cumulativeWeight += mod.DropChance
    if (random <= cumulativeWeight) {
      return mod
    }
  }

  return mods[mods.length - 1]
}
