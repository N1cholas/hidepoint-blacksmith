import { describe, it, expect } from 'vitest'
import { randomlyGetAffixFamily } from './randomlyGetAffixFamily'
import { randomlyGetAffix } from './randomlyGetAffix'

describe('randomlyGetAffixFamily', () => {
  it('should throw an error if affixFamilies is empty', () => {
    expect(() => randomlyGetAffixFamily([])).toThrow(
      'randomlyGetAffixFamily: affixFamilies is empty',
    )
  })

  it('should return the first affixFamily if all weights are 0', () => {
    const affixFamilies = [
      { id: '1', weight: 0 },
      { id: '2', weight: 0 },
    ] as any[]
    const result = randomlyGetAffixFamily(affixFamilies)
    expect(result).toBe(affixFamilies[0])
  })

  it('should return an affixFamily based on weights', () => {
    const affixFamilies = [
      { id: '1', weight: 1 },
      { id: '2', weight: 2 },
      { id: '3', weight: 7 },
    ] as any[]
    const rng = () => 0.8 // 模拟随机数
    const result = randomlyGetAffixFamily(affixFamilies, rng)
    expect(result).toBe(affixFamilies[2])
  })

  it('should handle negative weights by treating them as 0', () => {
    const affixFamilies = [
      { id: '1', weight: -1 },
      { id: '2', weight: 2 },
    ] as any[]
    const rng = () => 0.5
    const result = randomlyGetAffixFamily(affixFamilies, rng)
    expect(result).toBe(affixFamilies[1])
  })
})

describe('randomlyGetAffix', () => {
  it('should throw an error if affixes is empty', () => {
    expect(() => randomlyGetAffix([], 1, 10)).toThrow('randomlyObtainAffix: affixes is empty')
  })

  it('should throw an error if maximumLevel is less than minimumLevel', () => {
    const affixes = [{ id: '1', level: 5, dropChance: 1 }] as any[]
    expect(() => randomlyGetAffix(affixes, 10, 5)).toThrow(
      'randomlyObtainAffix: maximumLevel is less than minimumLevel',
    )
  })

  it('should return the first affix if all weights are 0', () => {
    const affixes = [
      { id: '1', level: 5, dropChance: 0 },
      { id: '2', level: 5, dropChance: 0 },
    ] as any[]
    const result = randomlyGetAffix(affixes, 1, 10)
    expect(result).toBe(affixes[0])
  })

  it('should filter affixes by level range', () => {
    const affixes = [
      { id: '1', level: 5, dropChance: 1 },
      { id: '2', level: 15, dropChance: 1 },
    ] as any[]
    const result = randomlyGetAffix(affixes, 1, 10)
    expect(result).toBe(affixes[0])
  })

  it('should return an affix based on weights', () => {
    const affixes = [
      { id: '1', level: 5, dropChance: 1 },
      { id: '2', level: 5, dropChance: 2 },
      { id: '3', level: 5, dropChance: 7 },
    ] as any[]
    const rng = () => 0.8 // 模拟随机数
    const result = randomlyGetAffix(affixes, 1, 10, rng)
    expect(result).toBe(affixes[2])
  })

  it('should handle negative dropChance by treating them as 0', () => {
    const affixes = [
      { id: '1', level: 5, dropChance: -1 },
      { id: '2', level: 5, dropChance: 2 },
    ] as any[]
    const rng = () => 0.5
    const result = randomlyGetAffix(affixes, 1, 10, rng)
    expect(result).toBe(affixes[1])
  })
})
