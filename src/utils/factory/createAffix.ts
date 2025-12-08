import type { RawNormalAffix } from '@/scripts/normalAffixesProcessor'
import { handleHTMLString } from '../string/handleHTMLString'

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

const extractChinese = (text: string): string => {
  if (typeof text !== 'string') return ''

  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3100-\u312f\u31a0-\u31bf]/g

  const matches = text.match(chineseRegex)

  return matches ? matches.join('') : ''
}

const initRawNormalAffix: RawNormalAffix = {
  Name: 'init',
  Level: '0',
  ModGenerationTypeID: '0',
  ModFamilyList: [],
  DropChance: '0',
  str: '',
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
    level: Number(_rawAffix.Level),
    // todo: 测试数据 -> 只有前缀和后缀区分
    isPrefix: _rawAffix.ModGenerationTypeID === '1',
    // todo: 测试数据 -> ModFamilyList 只有一个元素
    id: _rawAffix.ModFamilyList[0] || '',
    dropChance: Number(_rawAffix.DropChance),
    str: handleHTMLString(_rawAffix.str),
    tags: _rawAffix.mod_no.map((tag) => extractChinese(tag)),
    tier: -1,
  }
}
