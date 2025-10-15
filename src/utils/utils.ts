import {
  type WeightWrapper,
  type GenerateModsFamilyConfig,
  MOD_GENERATION_TYPE,
  type Modifier,
} from '@/types/types'
import _ from 'lodash'

export const processHtmlString = (htmlString: string) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  const spans = tempDiv.querySelectorAll('span')
  spans.forEach((span) => {
    span.replaceWith(...span.childNodes)
  })

  const links = tempDiv.querySelectorAll('a')
  links.forEach((link) => {
    const text = document.createTextNode(link.textContent || '')
    link.replaceWith(text)
  })

  const str = tempDiv.innerHTML

  return str
}

// todo:性能优化
export const modFamilyWeightedRandom = <T>(weightedItems: WeightWrapper<T>[]): WeightWrapper<T> => {
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

export const reverseModsFamilyWeightedRandom = <T>(
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

export const getModifier = (mods: Modifier[], minimumLevel: number): Modifier => {
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

// limit rules 前3 后3 总6
export const generateModsFamily = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
  config: GenerateModsFamilyConfig = { prefixNum: 3, suffixNum: 3 },
): WeightWrapper<Modifier[]>[] => {
  if (curModsFamily.length >= config.prefixNum + config.suffixNum) return []

  const [curPrefix, curSuffix] = _.partition(
    curModsFamily,
    (mod) => mod.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )

  const curIds = new Set(curModsFamily.map((mod) => mod.id))

  // 惰性计算：仅当需要时才过滤结果
  const shouldIncludePrefix = curPrefix.length < config.prefixNum
  const shouldIncludeSuffix = curSuffix.length < config.suffixNum

  return modsFamily.filter((mod) => {
    const isPrefix = mod.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX
    const isSuffix = mod.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX

    return (
      !curIds.has(mod.id) && // 去重检查
      ((shouldIncludePrefix && isPrefix) ||
        (shouldIncludeSuffix && isSuffix) ||
        (!isPrefix && !isSuffix)) // 保留非前后缀类型
    )
  })
}

export const filterModsFamilyByTags = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  if (curModsFamily.length >= 6) return []

  const curTagSet = new Set<string>()
  curModsFamily.forEach((mod) => {
    if (mod.tags) mod.tags.forEach((tag) => curTagSet.add(tag))
  })

  // 处理词条的tag为空的情况
  if (curTagSet.size === 0) return modsFamily

  const filtered = modsFamily.filter((mod) => mod.tags?.some((tag) => curTagSet.has(tag)))

  // 处理没有找到符合tag的词条的情况，例如弓的敏捷词条等
  return filtered.length ? filtered : modsFamily
}

export const onlyPrefixModsFamily = (
  modsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )
}

export const onlySuffixModsFamily = (
  modsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  return modsFamily.filter(
    (_modsFamily) => _modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  )
}

export const processModsFamily = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
  omen: {
    homogenisingExaltaion?: boolean
    sinistralExaltation?: boolean
    dextralExaltation?: boolean
  },
): WeightWrapper<Modifier[]>[] => {
  const steps: ((mods: WeightWrapper<Modifier[]>[]) => WeightWrapper<Modifier[]>[])[] = [
    (mods) => generateModsFamily(mods, curModsFamily),
    ...(omen.homogenisingExaltaion
      ? [(mods: WeightWrapper<Modifier[]>[]) => filterModsFamilyByTags(mods, curModsFamily)]
      : []),
    ...(omen.sinistralExaltation ? [onlyPrefixModsFamily] : []),
    ...(omen.dextralExaltation ? [onlySuffixModsFamily] : []),
  ]

  return steps.reduce((result, step) => step(result), modsFamily)
}
