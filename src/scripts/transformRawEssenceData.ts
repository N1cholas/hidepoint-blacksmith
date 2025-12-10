import type { RawDataFile } from './dataTransform'
import { createEssence, type Essence } from '../utils/factory/createEssence'

export default function transformRawEssenceData(raw: RawDataFile): Essence[] {
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

  return uniqueEssences
}
