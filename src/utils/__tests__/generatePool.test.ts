import { describe, it, expect, vi } from 'vitest'
import { generateAddPool } from '@/utils/generatePool'

describe('generateAffixFamiliesPool', () => {
  const rawAffixFamiliesPool = [
    { id: '1', modGenerationTypeID: 1, tags: ['included'] },
    { id: '2', modGenerationTypeID: 2, tags: ['included'] },
    { id: '3', modGenerationTypeID: 1, tags: ['excluded'] },
    { id: '4', modGenerationTypeID: 2, tags: ['included'] },
  ]

  const curAffixFamilies = [{ id: '1', modGenerationTypeID: 1, tags: ['included'] }]

  it('should return the raw pool if no options are provided', () => {
    const options = {}
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual(rawAffixFamiliesPool)
  })

  it('should deduplicate affix families', () => {
    const options = { deduplication: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([
      { id: '2', modGenerationTypeID: 2, tags: ['included'] },
      { id: '3', modGenerationTypeID: 1, tags: ['excluded'] },
      { id: '4', modGenerationTypeID: 2, tags: ['included'] },
    ])
  })

  it('should filter affix families by tags', () => {
    const options = { filterByTags: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([
      { id: '1', modGenerationTypeID: 1, tags: ['included'] },
      { id: '2', modGenerationTypeID: 2, tags: ['included'] },
      { id: '4', modGenerationTypeID: 2, tags: ['included'] },
    ])
  })

  it('should only include prefix affix families', () => {
    const options = { onlyPrefix: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([
      { id: '1', modGenerationTypeID: 1, tags: ['included'] },
      { id: '3', modGenerationTypeID: 1, tags: ['excluded'] },
    ])
  })

  it('should only include suffix affix families', () => {
    const options = { onlySuffix: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([
      { id: '2', modGenerationTypeID: 2, tags: ['included'] },
      { id: '4', modGenerationTypeID: 2, tags: ['included'] },
    ])
  })

  it('should apply multiple options in sequence 1', () => {
    const options = { deduplication: true, filterByTags: true, onlyPrefix: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([])
  })

  it('should apply multiple options in sequence 2', () => {
    const options = { deduplication: true, filterByTags: true, onlySuffix: true }
    const result = generateAddPool(rawAffixFamiliesPool as any, curAffixFamilies as any, options)
    expect(result).toEqual([
      {
        id: '2',
        modGenerationTypeID: 2,
        tags: ['included'],
      },
      {
        id: '4',
        modGenerationTypeID: 2,
        tags: ['included'],
      },
    ])
  })

  it('should apply multiple options in sequence 3', () => {
    const options = { deduplication: true, filterByTags: true, onlyPrefix: true }
    const result = generateAddPool(
      rawAffixFamiliesPool as any,
      [{ id: '2', modGenerationTypeID: 2, tags: ['included'] }] as any,
      options,
    )
    expect(result).toEqual([
      {
        id: '1',
        modGenerationTypeID: 1,
        tags: ['included'],
      },
    ])
  })
})
