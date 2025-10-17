import {
  type WeightWrapper,
  type GenerateModsFamilyConfig,
  MOD_GENERATION_TYPE,
  type Modifier,
} from '@/types/types'
import _ from 'lodash'

// limit rules 前3 后3 总6
export const generateAffixFamilies = (
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

export const generateAddAffixFamiliesPool = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
  config: {
    filterByTags?: boolean
    onlyPrefix?: boolean
    onlySuffix?: boolean
  },
): WeightWrapper<Modifier[]>[] => {
  const steps: ((mods: WeightWrapper<Modifier[]>[]) => WeightWrapper<Modifier[]>[])[] = [
    (mods) => generateAffixFamilies(mods, curModsFamily),
    ...(config.filterByTags
      ? [(mods: WeightWrapper<Modifier[]>[]) => filterModsFamilyByTags(mods, curModsFamily)]
      : []),
    ...(config.onlyPrefix ? [onlyPrefixModsFamily] : []),
    ...(config.onlySuffix ? [onlySuffixModsFamily] : []),
  ]

  return steps.reduce((result, step) => step(result), modsFamily)
}
