import { describe, it, expect } from 'vitest'
import { generateAddPool } from './generateAddPool'
import type { AffixFamily } from '../factory/createAffixFamily'

describe('generateAddPool', () => {
  const mockAffixFamilies: AffixFamily[] = [
    { id: '1', isPrefix: true, tags: ['test'], weight: 1 },
    { id: '2', isPrefix: false, tags: ['other'], weight: 1 },
    { id: '3', isPrefix: true, tags: ['test'], weight: 1 },
  ] as AffixFamily[]

  const currentAffixFamilies: AffixFamily[] = [
    { id: '1', isPrefix: true, tags: ['test'], weight: 1 },
  ] as AffixFamily[]

  it('should return the original pool if no options are provided', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, {})
    expect(result).toEqual(mockAffixFamilies)
  })

  it('should deduplicate affix families', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, { deduplication: true })
    expect(result).toEqual([
      { id: '2', isPrefix: false, tags: ['other'], weight: 1 },
      { id: '3', isPrefix: true, tags: ['test'], weight: 1 },
    ])
  })

  it('should filter affix families by tags', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, { filterByTags: true })
    expect(result).toEqual([
      { id: '1', isPrefix: true, tags: ['test'], weight: 1 },
      { id: '3', isPrefix: true, tags: ['test'], weight: 1 },
    ])
  })

  it('should filter only prefix affix families', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, { onlyPrefix: true })
    expect(result).toEqual([
      { id: '1', isPrefix: true, tags: ['test'], weight: 1 },
      { id: '3', isPrefix: true, tags: ['test'], weight: 1 },
    ])
  })

  it('should filter only suffix affix families', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, { onlySuffix: true })
    expect(result).toEqual([{ id: '2', isPrefix: false, tags: ['other'], weight: 1 }])
  })

  it('should apply multiple options together', () => {
    const result = generateAddPool(mockAffixFamilies, currentAffixFamilies, {
      deduplication: true,
      filterByTags: true,
      onlyPrefix: true,
    })
    expect(result).toEqual([{ id: '3', isPrefix: true, tags: ['test'], weight: 1 }])
  })
})
