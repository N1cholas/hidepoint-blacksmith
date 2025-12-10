import type { RawEssenceAffix } from '@/scripts/dataTransform'
import { extractChinese } from './createAffix'

export type Essence = {
  type: string
  level: number
  name: string
  id: string
  workOnRare?: boolean
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
  }
}
