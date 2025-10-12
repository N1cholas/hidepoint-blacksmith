import type { Modifier } from '@/types/types'
import { getModifier } from '@/utils/utils'
import { describe, it, expect } from 'vitest'

describe('getModifier test', () => {
  const mods: Modifier[] = [
    {
      Name: '貓鼬之',
      Level: 1,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(5&ndash;8)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/f866f0ba875d6c09d9da1a2305248f81311597f3e170de538610566c6b697047',
    },
    {
      Name: '山貓之',
      Level: 11,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(9&ndash;12)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/38d6cded641edf05badd03efca9a9b9c0c921d1a477e73ce96145b66d8c8fb57',
    },
    {
      Name: '狐狸之',
      Level: 22,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(13&ndash;16)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/8918ee8d2f3914ff879fe8e9bd41ed2dda826d0980a750f823d3b15cd40987b2',
    },
    {
      Name: '獵鷹之',
      Level: 33,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(17&ndash;20)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/cab87dc0e4e5e48ea55756ae62314c85dd9721930b263545f514cfff3963fc5d',
    },
    {
      Name: '豹之',
      Level: 44,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(21&ndash;24)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/6074655199b4032990cbb7481e8f55e6dd7cacd4fcb2a58015e0ac7894c925dc',
    },
    {
      Name: '花豹之',
      Level: 55,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(25&ndash;27)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/9fd9fc6590d42c0d67adc5211a0e6959db3b3742d4163edd40bcba8419c923f5',
    },
    {
      Name: '美洲豹之',
      Level: 66,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(28&ndash;30)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/b916c1f543e9da77e1cd1f867d97eacd5983ab5c455b2217c3be847346644a22',
    },
    {
      Name: '幻影之',
      Level: 74,
      ModGenerationTypeID: 2,
      ModFamilyList: ['Dexterity'],
      DropChance: 1000,
      str: '<span class=\'mod-value\'>+(31&ndash;33)</span> 點<a data-keyword="Dexterity" href="Dexterity" class="KeywordPopups" data-hover="/cache2/tw/Poe_Data_KeywordPopups_hover/6439547bee3d1b5cf98adcffa6b577db075d7816eb783ccb36c535058c578459">敏捷</a>',
      fossil_no: ['attribute'],
      mod_no: ["<span class='badge bg-primary ' data-tag='attribute'>能力</span>"],
      mod_fossil_item: [],
      hover:
        '/cache2/tw/Poe_Data_Mods_hover/e6282721a8d6aee48c4d3656e14cb55167562fee5ad8a3f21e479d8851827a99',
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
