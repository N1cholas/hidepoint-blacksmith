import type { RawDataFile } from './dataTransform'
import { createEssence, type Essence } from '../utils/factory/createEssenceAffix'
import { groupBy, values } from 'lodash-es'

export type EssenceGroup = Essence[]

export default function transformRawEssenceData(raw: RawDataFile): EssenceGroup[] {
  const rawEssenceData = raw.essence

  if (!raw || !Array.isArray(rawEssenceData)) {
    throw new Error('Invalid input file: missing "essence" array')
  }

  const essences = rawEssenceData.map(createEssence)

  // 深渊词缀有两条 一条前缀一条后缀 去重一下
  const uniqueEssences = Array.from(
    essences
      .reduce((map, essence) => {
        if (!map.has(essence.name)) {
          map.set(essence.name, essence)
        }
        return map
      }, new Map<string, Essence>())
      .values(),
  )

  const groupEssences = groupBy(uniqueEssences, (uniqueEssence) => uniqueEssence.essenceGroupID)

  return values(groupEssences)
}
