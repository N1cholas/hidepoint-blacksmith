import type { RawEssenceAffix } from "@/scripts/dataTransform"
import { extractChinese } from "./createAffix"

export type EssenceAffix = {
  type: string
  level: number
  dropChance: number
  isPrefix: boolean
  tags: string[]
  fossil_no: string[]
  name: string
  code: string
  id: string
  str: string
}

export const createEssenceConfig = (rawEssence: RawEssenceAffix): EssenceAffix => {
  return {
    type: rawEssence.type,
    level: Number(rawEssence.Level),
    dropChance: rawEssence.DropChance,
    // todo: 测试数据 -> 只有前缀和后缀区分
    isPrefix: rawEssence.ModGenerationTypeID === '1',
    tags: rawEssence.mod_no.map((tag) => extractChinese(tag)),
    fossil_no: rawEssence.fossil_no,
    name: rawEssence.Name,
    code: rawEssence.Code,
    // todo: 测试数据 -> ModFamilyList 只有一个元素
    id: rawEssence.ModFamilyList[0] || '',
    str: rawEssence.str,
}
}
