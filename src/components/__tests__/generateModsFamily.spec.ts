import type { Modifier, WeightWrapper } from '@/types/types'
import { generateAffixFamilies } from '@/utils/utils'
import { describe, expect, it } from 'vitest'

describe('generateModsFamily test', () => {
  const bowModsFamily: WeightWrapper<Modifier[]>[] = [
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
      tags: [],
    },
    {
      items: [],
      weight: 8000,
      id: 'Dexterity',
      modGenerationTypeID: 2,
      tags: [],
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
      tags: [],
    },
    {
      items: [],
      weight: 5880,
      id: 'FireDamage',
      modGenerationTypeID: 1,
      tags: [],
    },
    {
      items: [],
      weight: 8820,
      id: 'LightningDamage',
      modGenerationTypeID: 1,
      tags: [],
    },
    {
      items: [],
      weight: 3775,
      id: 'LocalPhysicalDamagePercent',
      modGenerationTypeID: 1,
      tags: [],
    },
  ]

  const config = {
    prefixNum: 3,
    suffixNum: 3,
  }

  it('should up to 3 prefix modifiers', () => {
    expect(
      generateAffixFamilies(bowModsFamily, [], config).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 8820,
            id: 'LightningDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 8820,
            id: 'LightningDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
          {
            items: [],
            weight: 5880,
            id: 'FireDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 8820,
            id: 'LightningDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
          {
            items: [],
            weight: 5880,
            id: 'FireDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
          {
            items: [],
            weight: 6300,
            id: 'PhysicalDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'LocalAttributeRequirements',
    ])
  })

  it('should up to 3 suffix modifiers', () => {
    expect(
      generateAffixFamilies(bowModsFamily, [], config).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 4000,
            id: 'LifeLeech',
            modGenerationTypeID: 2,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'Dexterity',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 4000,
            id: 'LifeLeech',
            modGenerationTypeID: 2,
            tags: [],
          },
          {
            items: [],
            weight: 8000,
            id: 'Dexterity',
            modGenerationTypeID: 2,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LocalAttributeRequirements',
      'PhysicalDamage',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 4000,
            id: 'LifeLeech',
            modGenerationTypeID: 2,
            tags: [],
          },
          {
            items: [],
            weight: 8000,
            id: 'Dexterity',
            modGenerationTypeID: 2,
            tags: [],
          },
          {
            items: [],
            weight: 2600,
            id: 'IncreaseSocketedGemLevel',
            modGenerationTypeID: 2,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'PhysicalDamage',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])
  })

  it('should up to 6 modifiers', () => {
    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
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
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([
      'IncreaseSocketedGemLevel',
      'LifeLeech',
      'Dexterity',
      'FireDamage',
      'LightningDamage',
      'LocalPhysicalDamagePercent',
    ])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
          {
            items: [],
            weight: 2600,
            id: 'IncreaseSocketedGemLevel',
            modGenerationTypeID: 2,
            tags: [],
          },
          {
            items: [],
            weight: 8000,
            id: 'Dexterity',
            modGenerationTypeID: 2,
            tags: [],
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
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual(['FireDamage', 'LightningDamage', 'LocalPhysicalDamagePercent'])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
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
            tags: [],
          },
          {
            items: [],
            weight: 5880,
            id: 'FireDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
          {
            items: [],
            weight: 3775,
            id: 'LocalPhysicalDamagePercent',
            modGenerationTypeID: 1,
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual(['IncreaseSocketedGemLevel', 'LifeLeech', 'Dexterity'])

    expect(
      generateAffixFamilies(
        bowModsFamily,
        [
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
            tags: [],
          },
          {
            items: [],
            weight: 5880,
            id: 'FireDamage',
            modGenerationTypeID: 1,
            tags: [],
          },
          {
            items: [],
            weight: 3775,
            id: 'LocalPhysicalDamagePercent',
            modGenerationTypeID: 1,
            tags: [],
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
            tags: [],
          },
        ],
        config,
      ).map((family) => family.id),
    ).toStrictEqual([])
  })
})
