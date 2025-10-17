import type { Modifier } from '@/types/types'
import { getModifier } from '@/utils/utils'
import { describe, it, expect } from 'vitest'

describe('getModifier test', () => {
  const mods: Modifier[] = [
    {
      Name: '猫鼬之',
      Level: 1,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(5&ndash;8)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity1',
      powerLevel: 8,
    },
    {
      Name: '山猫之',
      Level: 11,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(9&ndash;12)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity2',
      powerLevel: 7,
    },
    {
      Name: '狐狸之',
      Level: 22,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(13&ndash;16)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity3',
      powerLevel: 6,
    },
    {
      Name: '猎鹰之',
      Level: 33,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(17&ndash;20)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity4',
      powerLevel: 5,
    },
    {
      Name: '豹之',
      Level: 44,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(21&ndash;24)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity5',
      powerLevel: 4,
    },
    {
      Name: '花豹之',
      Level: 55,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(25&ndash;27)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity6',
      powerLevel: 3,
    },
    {
      Name: '美洲豹之',
      Level: 66,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(28&ndash;30)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity7',
      powerLevel: 2,
    },
    {
      Name: '幻影之',
      Level: 74,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(31&ndash;33)</span> <a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="?s=Data%5CKeywordPopups%2FDexterity">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary craftingattribute' data-tag='attribute'>属性</span>"],
      mod_fossil_item: [],
      hover: '?s=Data%5CMods%2FDexterity8',
      powerLevel: 1,
    },
  ]

  it('should up to 35 level modifier', () => {
    expect(getModifier(mods, 0).Level >= 0).toBeTruthy()
  })

  it('should up to 35 level modifier', () => {
    expect(getModifier(mods, 35).Level >= 35).toBeTruthy()
  })

  it('should up to 35 level modifier', () => {
    expect(getModifier(mods, 55).Level >= 55).toBeTruthy()
  })
})
