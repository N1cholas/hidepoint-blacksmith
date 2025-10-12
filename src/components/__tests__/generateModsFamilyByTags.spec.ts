import type { Modifier, WeightWrapper } from '@/types/types'
import { filterModsFamilyByTags } from '@/utils/utils'
import { describe, expect, it } from 'vitest'

describe('generateModsFamily test', () => {
  const bowModsFamily: WeightWrapper<Modifier[]>[] = [
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
    {
      items: [],
      weight: 4000,
      id: 'ManaLeech',
      modGenerationTypeID: 2,
      tags: ['魔力', '物理', '攻击'],
    },
    {
      items: [],
      weight: 6000,
      id: 'LifeGainedFromEnemyDeath',
      modGenerationTypeID: 2,
      tags: ['生命'],
    },
    {
      items: [],
      weight: 6000,
      id: 'ManaGainedFromEnemyDeath',
      modGenerationTypeID: 2,
      tags: ['魔力'],
    },
    {
      items: [],
      weight: 4000,
      id: 'LifeGainPerTarget',
      modGenerationTypeID: 2,
      tags: ['生命', '攻击'],
    },
    {
      items: [],
      weight: 3900,
      id: 'IncreasedAttackSpeed',
      modGenerationTypeID: 2,
      tags: ['攻击', '速度'],
    },
    {
      items: [],
      weight: 5800,
      id: 'IncreasedAccuracy',
      modGenerationTypeID: 1,
      tags: ['攻击'],
    },
    {
      items: [],
      weight: 3875,
      id: 'CriticalStrikeChanceIncrease',
      modGenerationTypeID: 2,
      tags: ['攻击', '暴击'],
    },
    {
      items: [],
      weight: 3875,
      id: 'CriticalStrikeMultiplier',
      modGenerationTypeID: 2,
      tags: ['伤害', '攻击', '暴击'],
    },
    {
      items: [],
      weight: 3000,
      id: 'LightRadiusAndAccuracy',
      modGenerationTypeID: 2,
      tags: ['攻击'],
    },
    {
      items: [],
      weight: 375,
      id: 'AdditionalArrows',
      modGenerationTypeID: 2,
      tags: ['攻击'],
    },
    {
      items: [],
      weight: 3000,
      id: 'IncreasedWeaponElementalDamagePercent',
      modGenerationTypeID: 1,
      tags: ['伤害', '元素', '攻击'],
    },
  ]

  it('should return all modifiers', () => {
    const allIDs = [
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'ColdDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
      'LocalIncreasedPhysicalDamagePercentAndAccuracyRating',
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'ManaLeech',
      'LifeGainedFromEnemyDeath',
      'ManaGainedFromEnemyDeath',
      'LifeGainPerTarget',
      'IncreasedAttackSpeed',
      'IncreasedAccuracy',
      'CriticalStrikeChanceIncrease',
      'CriticalStrikeMultiplier',
      'LightRadiusAndAccuracy',
      'AdditionalArrows',
      'IncreasedWeaponElementalDamagePercent',
    ]

    expect(filterModsFamilyByTags(bowModsFamily, []).map((family) => family.id)).toStrictEqual(
      allIDs,
    )

    expect(
      filterModsFamilyByTags(bowModsFamily, [
        {
          items: [],
          weight: 5000,
          id: 'LocalAttributeRequirements',
          modGenerationTypeID: 2,
          tags: [],
        },
      ]).map((family) => family.id),
    ).toStrictEqual(allIDs)

    expect(
      filterModsFamilyByTags(
        bowModsFamily.filter((family) => family.id !== 'Dexterity'),
        [
          {
            items: [],
            weight: 8000,
            id: 'Dexterity',
            modGenerationTypeID: 2,
            tags: ['属性'],
          },
        ],
      ).map((family) => family.id),
    ).toStrictEqual(allIDs.slice(1))
  })

  it('should return modifiers with ["攻击", "暴击"] tags', () => {
    expect(
      filterModsFamilyByTags(bowModsFamily, [
        {
          items: [],
          weight: 3875,
          id: 'CriticalStrikeChanceIncrease',
          modGenerationTypeID: 2,
          tags: ['攻击', '暴击'],
        },
      ]).map((family) => family.id),
    ).toStrictEqual([
      'PhysicalDamage',
      'FireDamage',
      'ColdDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
      'LocalIncreasedPhysicalDamagePercentAndAccuracyRating',
      'LifeLeech',
      'ManaLeech',
      'LifeGainPerTarget',
      'IncreasedAttackSpeed',
      'IncreasedAccuracy',
      'CriticalStrikeChanceIncrease',
      'CriticalStrikeMultiplier',
      'LightRadiusAndAccuracy',
      'AdditionalArrows',
      'IncreasedWeaponElementalDamagePercent',
    ])
  })
})
