import { handleHTMLString } from '../string/handleHTMLString'

export type RawNormalAffix = {
  Name: string
  Level: string
  ModGenerationTypeID: string
  ModFamilyList: string[]
  DropChance: string
  str: string
  fossil_no: string[]
  mod_no: string[]
  mod_fossil_item: string[]
  hover: string
}

export type Affix = {
  name: string
  level: number
  isPrefix: boolean
  id: string
  dropChance: number
  str: string
  tags: string[]
  // add new field
  tier: number
  desecrated?: boolean
}

export const HIDE_TIER = -1

const initRawNormalAffix: RawNormalAffix = {
  Name: 'init',
  Level: '0',
  ModGenerationTypeID: '0',
  ModFamilyList: [],
  DropChance: '0',
  str: 'init',
  fossil_no: [],
  mod_no: [],
  mod_fossil_item: [],
  hover: '',
}

export const createAffix = (rawAffix: Partial<RawNormalAffix>): Affix => {
  if (!rawAffix?.ModFamilyList?.[0]) {
    throw new Error(`ModFamilyList is empty for affix: ${rawAffix.Name}`)
  }

  if (!rawAffix?.ModFamilyList.length) {
    throw new Error(`ModFamilyList is empty for affix: ${rawAffix.ModFamilyList}`)
  }

  const _rawAffix = { ...initRawNormalAffix, ...rawAffix }

  return {
    name: _rawAffix.Name,
    // todo: 测试数据 -> 能否转换成数字
    level: Number(_rawAffix.Level),
    // todo: 测试数据 -> 只有前缀和后缀区分
    isPrefix: _rawAffix.ModGenerationTypeID === '1',
    // todo: 测试数据 -> ModFamilyList 只有一个元素
    id: _rawAffix.ModFamilyList[0] || '',
    dropChance: Number(_rawAffix.DropChance),
    str: handleHTMLString(_rawAffix.str),
    // todo: 使用 handleHTMLString 处理 tags
    tags: _rawAffix.mod_no.map((tag) =>
      handleHTMLString(tag, {
        unwrapTags: ['span', 'i'],
      }),
    ),
    tier: HIDE_TIER,
  }
}
