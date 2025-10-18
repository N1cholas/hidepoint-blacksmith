import { describe, it, expect } from 'vitest'
import { randomlyObtainAffixFamily, reverseRandomlyObtainAffixFamily } from '@/utils/randomlyObtain'

describe('randomlyObtainAffixFamily', () => {
  it('should return an item based on weight distribution', () => {
    const weightedItems = [
      { weight: 1, value: 'A' },
      { weight: 2, value: 'B' },
      { weight: 3, value: 'C' },
    ]

    const results = { A: 0, B: 0, C: 0 }

    // Run the function multiple times to simulate randomness
    for (let i = 0; i < 10000; i++) {
      const result = randomlyObtainAffixFamily(weightedItems as any)
      results[result.value as 'A' | 'B' | 'C']++
    }

    // Check that the results roughly match the weight distribution
    expect(results.A).toBeGreaterThan(1000)
    expect(results.B).toBeGreaterThan(2000)
    expect(results.C).toBeGreaterThan(3000)
  })
})

describe('reverseRandomlyObtainAffixFamily', () => {
  it('should return an item based on inverse weight distribution', () => {
    const weightedItems = [
      { weight: 1, value: 'A' },
      { weight: 2, value: 'B' },
      { weight: 3, value: 'C' },
    ]

    const results = { A: 0, B: 0, C: 0 }

    // Run the function multiple times to simulate randomness
    for (let i = 0; i < 10000; i++) {
      const result = reverseRandomlyObtainAffixFamily(weightedItems as any)
      results[result.value as 'A' | 'B' | 'C']++
    }

    // Check that the results roughly match the inverse weight distribution
    expect(results.A).toBeGreaterThan(3000)
    expect(results.B).toBeGreaterThan(2000)
    expect(results.C).toBeGreaterThan(1000)
  })

  it('should handle very small weights correctly', () => {
    const weightedItems = [
      { weight: 0.0001, value: 'A' },
      { weight: 0.0002, value: 'B' },
      { weight: 0.0003, value: 'C' },
    ]

    const results = { A: 0, B: 0, C: 0 }

    // Run the function multiple times to simulate randomness
    for (let i = 0; i < 10000; i++) {
      const result = reverseRandomlyObtainAffixFamily(weightedItems as any)
      results[result.value as 'A' | 'B' | 'C']++
    }

    // Check that the results roughly match the inverse weight distribution
    expect(results.A).toBeGreaterThan(3000)
    expect(results.B).toBeGreaterThan(2000)
    expect(results.C).toBeGreaterThan(1000)
  })
})
