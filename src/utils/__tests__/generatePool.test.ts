import { describe, it, expect, vi } from 'vitest'
import { generateAddPool, generateSelectPool } from '@/utils/generatePool'
import { MOD_GENERATION_TYPE, type Modifier, type WeightWrapper } from '@/types/types'

describe('generateAddPool', () => {
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

describe('generateSelectPool', () => {
  const mockAffixFamilies = [
    { id: '1', modGenerationTypeID: MOD_GENERATION_TYPE.PREFIX },
    { id: '2', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX },
    { id: '3', modGenerationTypeID: MOD_GENERATION_TYPE.PREFIX },
    { id: '4', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX },
  ] as WeightWrapper<Modifier[]>[]

  const mockAffixes = [
    { ModFamilyList: ['1'], powerLevel: 10 },
    { ModFamilyList: ['2'], powerLevel: 20 },
    { ModFamilyList: ['3'], powerLevel: 10 },
  ] as Modifier[]

  it('should return the full pool if no options are provided', () => {
    const options = {}
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual(mockAffixFamilies)
  })

  it('should filter by lowestValue when not all power level are the same', () => {
    const options = { lowestValue: true }
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual([{ id: '2', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX }])
  })

  it('should return the full pool if all power levels are the same', () => {
    const options = { lowestValue: true }
    const affixesWithSamePowerLevel = [
      { ModFamilyList: ['1'], powerLevel: 10 },
      { ModFamilyList: ['2'], powerLevel: 10 },
      { ModFamilyList: ['3'], powerLevel: 10 },
    ] as Modifier[]
    const result = generateSelectPool(mockAffixFamilies, affixesWithSamePowerLevel, options)
    expect(result).toEqual(mockAffixFamilies)
  })

  it('should filter by onlyPrefix', () => {
    const options = { onlyPrefix: true }
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual([
      { id: '1', modGenerationTypeID: MOD_GENERATION_TYPE.PREFIX },
      { id: '3', modGenerationTypeID: MOD_GENERATION_TYPE.PREFIX },
    ])
  })

  it('should filter by onlySuffix', () => {
    const options = { onlySuffix: true }
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual([
      { id: '2', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX },
      { id: '4', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX },
    ])
  })

  it('should handle combined options', () => {
    const options = { onlyPrefix: true, lowestValue: true }
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual([{ id: '2', modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX }])
  })

  it('should return the empty pool if onlyPrefix and onlySuffix are true', () => {
    const options = { onlyPrefix: true, onlySuffix: true }
    const result = generateSelectPool(mockAffixFamilies, mockAffixes, options)
    expect(result).toEqual([])
  })
})
