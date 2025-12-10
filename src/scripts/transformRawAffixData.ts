import { createAffix, type Affix } from '../utils/factory/createAffix'
import { createAffixFamily, type AffixFamily } from '../utils/factory/createAffixFamily'
import { groupBy } from 'lodash-es'
import type { RawDataFile } from './dataTransform'

export default function normalTransform(raw: RawDataFile): AffixFamily[] {
  if (!raw || !Array.isArray(raw.normal)) {
    throw new Error('Invalid input file: missing "normal" array')
  }

  const affixes: Affix[] = raw.normal.map(createAffix)

  const grouped: Record<string, Affix[]> = groupBy(affixes, 'id')

  return Object.values(grouped)
    .map((affixes) => createAffixFamily(affixes))
    .sort((a) => (a.isPrefix ? -1 : 1))
}
