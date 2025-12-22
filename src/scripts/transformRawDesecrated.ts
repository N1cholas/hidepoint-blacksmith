import type { RawDataFile } from './dataTransform'
import type { Affix } from '../utils/factory/createAffix'
import { createDesecratedAffix } from '../utils/factory/createDesecratedAffix'

export default function transformRawDesecratedData(raw: RawDataFile): Affix[] {
  const rawDesecratedData = raw.desecrated

  if (!raw || !Array.isArray(rawDesecratedData)) {
    throw new Error('Invalid input file: missing "desecrated" array')
  }

  const desecratedAffixes = rawDesecratedData.map(createDesecratedAffix)

  return desecratedAffixes
}
