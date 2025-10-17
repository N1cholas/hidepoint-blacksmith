import { describe, it, expect } from 'vitest'
import type { Modifier, WeightWrapper } from '@/types/types'
import { generateExaltedOrbAffixPool } from '@/utils/utils'

// Mock 数据
const mockModsFamily: WeightWrapper<Modifier[]>[] = [
  {
    items: [],
    weight: 8000,
    id: 'Dexterity',
    modGenerationTypeID: 2,
    tags: ['属性'],
  },
  {
    items: [],
    weight: 5000,
    id: 'LocalAttributeRequirements',
    modGenerationTypeID: 2,
    tags: [],
  },
  {
    items: [],
    weight: 6300,
    id: 'PhysicalDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '物理', '攻击'],
  },
  {
    items: [],
    weight: 5880,
    id: 'FireDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '元素', '火焰', '攻击'],
  },
  {
    items: [],
    weight: 5880,
    id: 'ColdDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '元素', '冰霜', '攻击'],
  },
  {
    items: [],
    weight: 8820,
    id: 'LightningDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '元素', '闪电', '攻击'],
  },
  {
    items: [],
    weight: 3775,
    id: 'LocalPhysicalDamagePercent',
    modGenerationTypeID: 1,
    tags: ['伤害', '物理', '攻击'],
  },
  {
    items: [],
    weight: 5300,
    id: 'LocalIncreasedPhysicalDamagePercentAndAccuracyRating',
    modGenerationTypeID: 1,
    tags: ['伤害', '物理', '攻击'],
  },
  {
    items: [],
    weight: 2600,
    id: 'IncreaseSocketedGemLevel',
    modGenerationTypeID: 2,
    tags: [],
  },
  {
    items: [],
    weight: 4000,
    id: 'LifeLeech',
    modGenerationTypeID: 2,
    tags: ['生命', '物理', '攻击'],
  },
]

const mockCurModsFamily: WeightWrapper<Modifier[]>[] = [
  {
    items: [],
    weight: 5880,
    id: 'ColdDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '元素', '冰霜', '攻击'],
  },
  {
    items: [],
    weight: 8820,
    id: 'LightningDamage',
    modGenerationTypeID: 1,
    tags: ['伤害', '元素', '闪电', '攻击'],
  },
  {
    items: [],
    weight: 3775,
    id: 'LocalPhysicalDamagePercent',
    modGenerationTypeID: 1,
    tags: ['伤害', '物理', '攻击'],
  },
  {
    items: [],
    weight: 8000,
    id: 'Dexterity',
    modGenerationTypeID: 2,
    tags: ['属性'],
  },
  {
    items: [],
    weight: 5000,
    id: 'LocalAttributeRequirements',
    modGenerationTypeID: 2,
    tags: [],
  },
  {
    items: [],
    weight: 4000,
    id: 'LifeLeech',
    modGenerationTypeID: 2,
    tags: ['生命', '物理', '攻击'],
  },
]

describe('processModsFamily', () => {
  it('should return [] when sinistralExaltation and dextralExaltation all true', () => {
    const omen = {
      filterByTags: true,
      onlyPrefix: true,
      onlySuffix: true,
    }

    const result = generateExaltedOrbAffixPool(mockModsFamily, mockCurModsFamily, omen)

    expect(result).toEqual([])
  })

  it('should return [] when current mods length >= 6', () => {
    const omen = {
      filterByTags: true,
      onlyPrefix: true,
      onlySuffix: false,
    }

    const result = generateExaltedOrbAffixPool(mockModsFamily, mockCurModsFamily, omen)

    expect(result).toEqual([])
  })

  it('shoule return prefix modsFamily and filter by tags', () => {
    const _mockCurModsFamily = mockCurModsFamily.slice().splice(-1)

    const omen = {
      filterByTags: true,
      onlyPrefix: true,
      onlySuffix: false,
    }

    const result = generateExaltedOrbAffixPool(mockModsFamily, _mockCurModsFamily, omen)

    expect(result).toEqual([
      {
        id: 'PhysicalDamage',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '物理', '攻击'],
        weight: 6300,
      },
      {
        id: 'FireDamage',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '元素', '火焰', '攻击'],
        weight: 5880,
      },
      {
        id: 'ColdDamage',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '元素', '冰霜', '攻击'],
        weight: 5880,
      },
      {
        id: 'LightningDamage',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '元素', '闪电', '攻击'],
        weight: 8820,
      },
      {
        id: 'LocalPhysicalDamagePercent',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '物理', '攻击'],
        weight: 3775,
      },
      {
        id: 'LocalIncreasedPhysicalDamagePercentAndAccuracyRating',
        items: [],
        modGenerationTypeID: 1,
        tags: ['伤害', '物理', '攻击'],
        weight: 5300,
      },
    ])
  })

  it('shoule return suffix modsFamily and filter by tags', () => {
    const _mockCurModsFamily = [
      {
        items: [],
        weight: 5880,
        id: 'ColdDamage',
        modGenerationTypeID: 1,
        tags: ['伤害', '元素', '冰霜', '攻击'],
      },
      {
        items: [],
        weight: 8820,
        id: 'LightningDamage',
        modGenerationTypeID: 1,
        tags: ['伤害', '元素', '闪电', '攻击'],
      },
      {
        items: [],
        weight: 3775,
        id: 'LocalPhysicalDamagePercent',
        modGenerationTypeID: 1,
        tags: ['伤害', '物理', '攻击'],
      },
      {
        items: [],
        weight: 8000,
        id: 'Dexterity',
        modGenerationTypeID: 2,
        tags: ['属性'],
      },
      {
        items: [],
        weight: 5000,
        id: 'LocalAttributeRequirements',
        modGenerationTypeID: 2,
        tags: [],
      },
    ]

    const omen = {
      filterByTags: true,
      onlyPrefix: false,
      onlySuffix: true,
    }

    const result = generateExaltedOrbAffixPool(mockModsFamily, _mockCurModsFamily, omen)

    expect(result).toEqual([
      {
        id: 'LifeLeech',
        items: [],
        modGenerationTypeID: 2,
        tags: ['生命', '物理', '攻击'],
        weight: 4000,
      },
    ])
  })
})
