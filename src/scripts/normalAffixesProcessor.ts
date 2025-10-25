import type { Affix, FileContent, RawNormalAffix } from '@/types/types'
import jsonfile from 'jsonfile'
import _ from 'lodash'

function extractChinese(text: string) {
  if (typeof text !== 'string') return ''
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3100-\u312f\u31a0-\u31bf]/g
  const matches = text.match(chineseRegex)
  return matches ? matches.join('') : ''
}

const errorHandler = (error: unknown) => console.error(error)

async function processMods() {
  try {
    const rawFile = 'src/scripts/rawData/bow.json'
    const file = 'src/data/bow_normal_mods.json'
    const obj = await jsonfile.readFile(rawFile)

    const groupedModsObj: Record<string, Affix[]> = _.groupBy(
      obj.normal.map((mod: RawNormalAffix) => ({
        ...mod,
        Level: Number(mod.Level),
        ModGenerationTypeID: Number(mod.ModGenerationTypeID),
        DropChance: Number(mod.DropChance),
      })),
      'ModFamilyList',
    )

    const fileContent: FileContent = {
      normal: Object.entries(groupedModsObj).map(([id, mods]) => ({
        items: mods.map((mod, i) => ({ ...mod, powerLevel: mods.length - i })),
        weight: mods.reduce((sum, mod) => sum + mod.DropChance, 0),
        id,
        modGenerationTypeID: mods[0].ModGenerationTypeID,
        tags: mods[0].mod_no.map((tag: string) => extractChinese(tag)),
      })),
    }

    await jsonfile.writeFile(file, fileContent)
    console.log('数据处理完成')
  } catch (error) {
    errorHandler(error)
  }
}

processMods()
