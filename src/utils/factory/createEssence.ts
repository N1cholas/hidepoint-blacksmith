import type { RawEssenceAffix } from '@/scripts/dataTransform'
import { extractChinese } from './createAffix'
import { handleHTMLString } from '../string/handleHTMLString'

export type Essence = {
  type: string
  level: number
  name: string
  id: string
  affixID: string
  workOnRare?: boolean
  str: string
  isPrefix: boolean
  tags: string[]
  code: string
}

// 测试raw数据
export const createEssence = (rawEssence: RawEssenceAffix): Essence => {
  const workOnRareNames = ['完美', '浮夸', '谵妄', '极恐', '错乱', '深渊']
  const name = extractChinese(rawEssence.Name)

  return {
    type: rawEssence.type,
    level: Number(rawEssence.Level),
    name,
    id: rawEssence.Code,
    // 精华的ModFamilyList[0]不唯一，例如弓的额外火焰额外闪电额外冰霜都是同一个
    // Essence的affixID === Affix的id
    affixID: rawEssence.ModFamilyList[0] || '',
    workOnRare: workOnRareNames.includes(name.substring(0, 2)),
    str: handleHTMLString(rawEssence.str),
    isPrefix: rawEssence.ModGenerationTypeID === '1',
    tags: rawEssence.mod_no.map((tag) => extractChinese(tag)),
    code: rawEssence.Code,
  }
}
