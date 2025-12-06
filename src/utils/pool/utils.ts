import type { AffixFamily } from '../factory/newAffixFamily'

export const deduplicationAffixFamilies = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
) => {
  const curIDs = new Set(curAffixFamilies.map((affixFamily) => affixFamily.id))

  return affixFamiliesPool.filter((affixFamily) => !curIDs.has(affixFamily.id))
}

export const filterAffixFamiliesByTags = (
  affixFamiliesPool: AffixFamily[],
  curAffixFamilies: AffixFamily[],
): AffixFamily[] => {
  if (curAffixFamilies.length >= 6) return []

  const curTagSet = new Set<string>()
  curAffixFamilies.forEach((af) => {
    if (af.tags) af.tags.forEach((tag) => curTagSet.add(tag))
  })

  // 处理词条的tag为空的情况
  if (curTagSet.size === 0) return affixFamiliesPool

  const filtered = affixFamiliesPool.filter((mod) => mod.tags?.some((tag) => curTagSet.has(tag)))

  // 处理没有找到符合tag的词条的情况，例如弓的敏捷词条等
  return filtered.length ? filtered : affixFamiliesPool
}

export const onlyPrefixAffixFamilies = (curAffixFamilies: AffixFamily[]) => {
  return curAffixFamilies.filter((af) => af.isPrefix)
}

export const onlySuffixAffixFamilies = (curAffixFamilies: AffixFamily[]) => {
  return curAffixFamilies.filter((af) => !af.isPrefix)
}
