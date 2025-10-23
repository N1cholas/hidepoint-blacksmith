import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  randomlyObtainAffixFamily,
  reverseRandomlyObtainAffixFamily,
  randomlyObtainAffix,
} from '@/utils/randomlyObtain'

const wf = (id: string, weight: number) => ({ id, weight }) as any

afterEach(() => {
  vi.restoreAllMocks()
})

describe('randomlyObtainAffixFamily', () => {
  const items = [wf('A', 1), wf('B', 3), wf('C', 6)] // total = 10

  it('picks first when rng maps into first weight bucket', () => {
    const rng = () => 0 // r = 0
    expect(randomlyObtainAffixFamily(items, rng).id).toBe('A')
  })

  it('picks middle when rng falls into second bucket', () => {
    const rng = () => 0.2 // r = 2 -> in (1,4]
    expect(randomlyObtainAffixFamily(items, rng).id).toBe('B')
  })

  it('picks last when rng falls into last bucket', () => {
    const rng = () => 0.95 // r = 9.5 -> >4
    expect(randomlyObtainAffixFamily(items, rng).id).toBe('C')
  })

  it('returns first when all weights are non-positive', () => {
    const allZero = [wf('Z1', 0), wf('Z2', -1)]
    const rng = () => 0.7
    expect(randomlyObtainAffixFamily(allZero, rng).id).toBe('Z1')
  })

  it('throws on empty input', () => {
    expect(() => randomlyObtainAffixFamily([], () => 0)).toThrow()
  })
})

describe('reverseRandomlyObtainAffixFamily', () => {
  const items = [wf('A', 1), wf('B', 2), wf('C', 7)]
  // inv = [1, 0.5, ~0.1429], total ~ 1.6429

  it('picks first when rng maps into first inverse bucket', () => {
    const rng = () => 0 // r = 0
    expect(reverseRandomlyObtainAffixFamily(items, rng).id).toBe('A')
  })

  it('picks second when rng maps into second inverse bucket', () => {
    const rng = () => 0.7 // r ~ 1.15 in (1,1.5]
    expect(reverseRandomlyObtainAffixFamily(items, rng).id).toBe('B')
  })

  it('picks last when rng maps into last inverse bucket', () => {
    const rng = () => 0.99 // r ~ 1.626 < 1.6429 => still last segment
    expect(reverseRandomlyObtainAffixFamily(items, rng).id).toBe('C')
  })

  it('zero weight becomes most likely via epsilon', () => {
    const epsilonDominated = [wf('ZERO', 0), wf('HUGE', 10)]
    const rng = () => 0.9 // r << 1/epsilon, should land in ZERO
    expect(reverseRandomlyObtainAffixFamily(epsilonDominated, rng).id).toBe('ZERO')
  })

  it('throws on empty input', () => {
    expect(() => reverseRandomlyObtainAffixFamily([], () => 0)).toThrow()
  })
})

describe('randomlyObtainAffix', () => {
  type Affix = { Level: number; DropChance: number; name: string }
  const aff = (Level: number, DropChance: number, name: string): Affix => ({
    Level,
    DropChance,
    name,
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('filters by level range first; picks only candidate in range', () => {
    const pool = [aff(10, 100, 'L10'), aff(50, 1, 'L50')]
    // range [40,60] => only L50 remains, regardless of rng
    vi.spyOn(Math, 'random').mockReturnValue(0.0)
    const picked = randomlyObtainAffix(pool as any, 40, 60)
    // @ts-ignore
    expect(picked.name).toBe('L50')
  })

  it('falls back to full pool when nothing in range', () => {
    const pool = [aff(10, 100, 'L10'), aff(20, 1, 'L20')]
    // range [30,40] => none, fallback -> use weights on full pool
    vi.spyOn(Math, 'random').mockReturnValue(0.0)
    const picked = randomlyObtainAffix(pool as any, 30, 40)
    // @ts-ignore
    expect(picked.name).toBe('L10') // first bucket with rng=0
  })

  it('returns first when all weights are non-positive after filtering', () => {
    const pool = [aff(10, 0, 'A'), aff(10, -5, 'B')]
    vi.spyOn(Math, 'random').mockReturnValue(0.8)
    const picked = randomlyObtainAffix(pool as any, 1, 100)
    // @ts-ignore
    expect(picked.name).toBe('A')
  })

  it('weighted selection respects buckets', () => {
    const pool = [aff(10, 1, 'A'), aff(10, 3, 'B'), aff(10, 6, 'C')] // total 10
    vi.spyOn(Math, 'random').mockReturnValue(0.2) // r = 2 -> B
    const picked = randomlyObtainAffix(pool as any, 1, 100)
    // @ts-ignore
    expect(picked.name).toBe('B')
  })

  it('throws on empty affix list', () => {
    expect(() => randomlyObtainAffix([], 1, 100)).toThrow()
  })

  it('throws on invalid level range min > max', () => {
    expect(() => randomlyObtainAffix([], 100, 1)).toThrow()
  })
})
