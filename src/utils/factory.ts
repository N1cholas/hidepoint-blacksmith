import { MOD_GENERATION_TYPE, type Affix, type AffixFamily } from '@/types/types'

export const createAffixFamily = (obj: Partial<AffixFamily>): AffixFamily => {
  return {
    items: [],
    weight: 0,
    id: '',
    modGenerationTypeID: MOD_GENERATION_TYPE.PREFIX,
    tags: [],
    ...obj,
  }
}

export const createAffix = (obj: Partial<Affix>): Affix => {
  return {
    Name: '',
    Level: 0,
    ModGenerationTypeID: MOD_GENERATION_TYPE.PREFIX,
    ModFamilyList: [],
    DropChance: 0,
    str: '',
    fossil_no: [],
    mod_no: [],
    mod_fossil_item: [],
    hover: '',
    powerLevel: 0,
    ...obj,
  }
}
