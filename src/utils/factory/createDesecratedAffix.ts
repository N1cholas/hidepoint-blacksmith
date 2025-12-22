import { handleHTMLString } from '../string/handleHTMLString'
import { HIDE_TIER, type Affix } from './createAffix'

export type RawDesecratedAffix = {
  Name: string
  Level: string
  ModGenerationTypeID: string
  ModFamilyList: string[]
  type: string
  str: string
  fossil_no: string[]
  mod_no: string[]
  mod_fossil_item: []
  hover: string
}

export const createDesecratedAffix = (rawDesecratedAffix: RawDesecratedAffix): Affix => {
  return {
    name: rawDesecratedAffix.Name,
    level: Number(rawDesecratedAffix.Level),
    isPrefix: rawDesecratedAffix.ModGenerationTypeID === '1',
    id: rawDesecratedAffix.ModFamilyList[0] || '',
    // todo 动态生成
    dropChance: 0,
    str: handleHTMLString(rawDesecratedAffix.str),
    tags: rawDesecratedAffix.mod_no.map((tag) =>
      handleHTMLString(tag, {
        unwrapTags: ['span', 'i'],
      }),
    ),
    tier: HIDE_TIER,
    desecrated: true,
  }
}
