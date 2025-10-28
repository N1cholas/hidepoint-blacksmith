import { describe, it, expect } from 'vitest'
import { createAffixFamily, createAffix } from '@/utils/factory'
import { MOD_GENERATION_TYPE, type Affix } from '@/types/types'

describe('createAffixFamily', () => {
  it('should return defaults', () => {
    const fam = createAffixFamily({})
    expect(fam.items).toEqual([])
    expect(fam.weight).toBe(0)
    expect(fam.id).toBe('')
    expect(fam.modGenerationTypeID).toBe(MOD_GENERATION_TYPE.PREFIX)
    expect(fam.tags).toEqual([])
  })

  it('should override provided fields', () => {
    const aff = createAffix({ Name: 'X', Level: 10 })
    const fam = createAffixFamily({
      id: 'fam-1',
      weight: 123,
      modGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX,
      items: [aff],
      tags: ['bow', 'attack'],
    })
    expect(fam.id).toBe('fam-1')
    expect(fam.weight).toBe(123)
    expect(fam.modGenerationTypeID).toBe(MOD_GENERATION_TYPE.SUFFIX)
    expect(fam.items).toHaveLength(1)
    expect(fam.tags).toEqual(['bow', 'attack'])
  })

  it('arrays should not be shared between instances', () => {
    const a = createAffixFamily({})
    const b = createAffixFamily({})
    expect(a.items).not.toBe(b.items)
    expect(a.tags).not.toBe(b.tags)
  })
})

describe('createAffix', () => {
  it('should return defaults', () => {
    const a = createAffix({})
    expect(a.Name).toBe('')
    expect(a.Level).toBe(0)
    expect(a.ModGenerationTypeID).toBe(MOD_GENERATION_TYPE.PREFIX)
    expect(a.ModFamilyList).toEqual([])
    expect(a.DropChance).toBe(0)
    expect(a.str).toBe('')
    expect(a.fossil_no).toEqual([])
    expect(a.mod_no).toEqual([])
    expect(a.mod_fossil_item).toEqual([])
    expect(a.hover).toBe('')
    expect(a.powerLevel).toBe(0)
  })

  it('should override provided fields', () => {
    const a = createAffix({
      Name: 'of Power',
      Level: 77,
      ModGenerationTypeID: MOD_GENERATION_TYPE.SUFFIX,
      ModFamilyList: ['fam-x'],
      DropChance: 456,
      powerLevel: 3,
    })
    expect(a.Name).toBe('of Power')
    expect(a.Level).toBe(77)
    expect(a.ModGenerationTypeID).toBe(MOD_GENERATION_TYPE.SUFFIX)
    expect(a.ModFamilyList).toEqual(['fam-x'])
    expect(a.DropChance).toBe(456)
    expect(a.powerLevel).toBe(3)
  })

  it('arrays should not be shared between instances', () => {
    const a = createAffix({})
    const b = createAffix({})
    expect(a.ModFamilyList).not.toBe(b.ModFamilyList)
    expect(a.fossil_no).not.toBe(b.fossil_no)
    expect(a.mod_no).not.toBe(b.mod_no)
    expect(a.mod_fossil_item).not.toBe(b.mod_fossil_item)
  })

  it('works with minimal valid overrides', () => {
    const input: Partial<Affix> = { Name: 'T1', Level: 1 }
    const a = createAffix(input)
    expect(a.Name).toBe('T1')
    expect(a.Level).toBe(1)
  })
})
