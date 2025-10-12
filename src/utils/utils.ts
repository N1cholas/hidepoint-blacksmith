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
// 高级e >= 35 level
// 完美e >= 50 level
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
  config: GenerateModsFamilyConfig = {
    prefixNum: 3,
    suffixNum: 3,
  },
): WeightWrapper<Modifier[]>[] => {
  if (curModsFamily.length >= 6) return []

  let result = modsFamily

  const curPreModsFamily = curModsFamily.filter(
    (modsFamily) => modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.PREFIX,
  )
  if (curPreModsFamily.length < config.prefixNum) {
    result = _.xorWith(result, curPreModsFamily, (res, cur) => res.id === cur.id)
  } else {
    result = result.filter((res) => res.modGenerationTypeID !== MOD_GENERATION_TYPE.PREFIX)
  }

  const curSufModsFamily = curModsFamily.filter(
    (modsFamily) => modsFamily.modGenerationTypeID === MOD_GENERATION_TYPE.SUFFIX,
  )
  if (curSufModsFamily.length < config.suffixNum) {
    result = _.xorWith(result, curSufModsFamily, (res, cur) => res.id === cur.id)
  } else {
    result = result.filter((res) => res.modGenerationTypeID !== MOD_GENERATION_TYPE.SUFFIX)
  }

  return result
}

export const filterModsFamilyByTags = (
  modsFamily: WeightWrapper<Modifier[]>[],
  curModsFamily: WeightWrapper<Modifier[]>[],
): WeightWrapper<Modifier[]>[] => {
  if (curModsFamily.length >= 6) return []

  let result = modsFamily

  const curTags = Array.from(
    new Set(curModsFamily.map((cur) => cur.tags).reduce((res, cur) => res.concat(cur), [])),
  )

  result = modsFamily.filter((_modsFamily) => _.intersection(_modsFamily.tags, curTags).length > 0)

  // 处理没有找到符合tag的词条的情况，例如词条的tag为空、弓的敏捷词条等
  if (!result.length) return modsFamily

  return result
}
