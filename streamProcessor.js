import jsonfile from 'jsonfile'
import _ from 'lodash'

function extractChinese(text) {
  if (typeof text !== 'string') return ''

  // 匹配Unicode汉字范围（基本汉字+扩展A+兼容+注音符号）
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3100-\u312f\u31a0-\u31bf]/g
  const matches = text.match(chineseRegex)
  return matches ? matches.join('') : ''
}

const errorHandler = (error) => console.error(error)
const rawFile = 'src\\rawData\\bow.json'

jsonfile
  .readFile(rawFile)
  .then((obj) =>
    obj.normal.map((mod) => ({
      ...mod,
      Level: Number(mod.Level),
      ModGenerationTypeID: Number(mod.ModGenerationTypeID),
      DropChance: Number(mod.DropChance),
    })),
  )
  .then((normalMods) => {
    const file = 'src\\data\\bow_normal_mods.json'
    // {
    //     Dexterity: [{}, {}, ..., {}],
    //     LocalAttributeRequirements: [{}, {}, ..., {}],
    // }
    const groupedModsObj = _.groupBy(normalMods, 'ModFamilyList')

    const modsFamilyNames = _.keys(groupedModsObj)

    // {
    //     "normal": [
    //       {
    //         "item": [],
    //         "weight": 8000,
    //       }
    //     ]
    // }
    const fileContent = {
      // 修改后保持type一致
      normal: _.values(groupedModsObj).map((mods, i) => ({
        items: mods,
        weight: mods.reduce((sum, mod) => sum + mod.DropChance, 0),
        id: modsFamilyNames[i],
        modGenerationTypeID: mods[0].ModGenerationTypeID,
        tags: mods[0].mod_no.map((tag) => extractChinese(tag)),
      })),
    }

    jsonfile.writeFile(file, fileContent, errorHandler)
  })
  .catch(errorHandler)
