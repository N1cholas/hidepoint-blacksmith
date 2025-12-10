import type { RawEssenceAffix } from '@/scripts/dataTransform'
import { extractChinese } from './createAffix'
import { handleHTMLString } from '../string/handleHTMLString'

export type Essence = {
  type: string
  level: number
  name: string
  id: string
  workOnRare?: boolean
  str: string
  isPrefix: boolean
  tags: string[]
  code: string
}

export const createEssence = (rawEssence: RawEssenceAffix): Essence => {
  const workOnRareNames = ['完美', '浮夸', '谵妄', '极恐', '错乱', '深渊']
  const name = extractChinese(rawEssence.Name)

  return {
    type: rawEssence.type,
    level: Number(rawEssence.Level),
    name,
    id: rawEssence.ModFamilyList[0] || '',
    workOnRare: workOnRareNames.includes(name.substring(0, 2)),
    str: handleHTMLString(rawEssence.str),
    isPrefix: rawEssence.ModGenerationTypeID === '1',
    tags: rawEssence.mod_no.map((tag) => extractChinese(tag)),
    code: rawEssence.Code,
  }
}
