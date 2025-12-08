import type { AffixFamily } from '../factory/createAffixFamily'
import { randomlyGetAffix } from '../random/randomlyGetAffix'
import { randomlyGetAffixFamily } from '../random/randomlyGetAffixFamily'
import { type GenerateAddPoolOptions, generateAddPool } from './generateAddPool'

export const generateDecryptAffix = (
  affixFamiliesPool: AffixFamily[],
  currentAffixFamilies: AffixFamily[],
  config: Partial<GenerateAddPoolOptions>,
  levels: [minimumLevel: number, maximumLevel: number],
  counts: number,
): AffixFamily[] => {
  const result: AffixFamily[] = []

  for (let i = 0; i < counts; i++) {
    const newAffixFamilies = generateAddPool(affixFamiliesPool, currentAffixFamilies.concat(result), config)

    if (newAffixFamilies.length === 0) {
      break
    }

    const hitAffixFamily = randomlyGetAffixFamily(newAffixFamilies)
    const hitAffix = randomlyGetAffix(hitAffixFamily.items, levels[0], levels[1])

    if (hitAffix) {
      const newFamily: AffixFamily = {
        ...hitAffixFamily,
        hitAffix
      }
      result.push(newFamily)
    }
  }

  return result
}
