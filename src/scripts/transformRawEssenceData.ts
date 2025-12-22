import type { RawDataFile } from './dataTransform'
import { createEssence, type Essence } from '../utils/factory/createEssence'
import { groupBy, values } from 'lodash-es'

export type EssenceGroup = Essence[]

export default function transformRawEssenceData(raw: RawDataFile): EssenceGroup[] {
  if (!raw || !Array.isArray(raw.essence)) {
    throw new Error('Invalid input file: missing "essence" array')
  }

  const essences = raw.essence.map(createEssence)

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

  // 中文group 英文还没做
  const groupEssences = groupBy(uniqueEssences, (uniqueEssence) => uniqueEssence.essenceGroupID)

  return values(groupEssences)
}
