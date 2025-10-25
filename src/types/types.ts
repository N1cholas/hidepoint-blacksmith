export type RawNormalAffix = {
  Name: string
  Level: string
  ModGenerationTypeID: string
  ModFamilyList: string[]
  DropChance: string
  str: string
  fossil_no: string[]
  mod_no: string[]
  mod_fossil_item: string[]
  hover: string
}
export type Affix = Omit<RawNormalAffix, 'Level' | 'ModGenerationTypeID' | 'DropChance'> & {
  // change type from string to number
  Level: number
  ModGenerationTypeID: number
  DropChance: number
  // add new type
  powerLevel: number
}

export type FileContent = {
  normal: AffixFamily[]
}

export type WeightWrapper<T> = {
  items: T
  weight: number
  id: string
  modGenerationTypeID: number
  tags: string[]
}

export type AffixFamily = WeightWrapper<Affix[]>

export type ItemConfig = {
  prefixNum: number
  suffixNum: number
}

export enum MOD_GENERATION_TYPE {
  PREFIX = 1,
  SUFFIX = 2,
}

export type OmenConfig = {
  // 崇高
  homogenisingExaltaion: boolean
  sinistralExaltation: boolean
  dextralExaltation: boolean
  greaterExaltation: boolean
  // 富豪
  homogenisingCoronation: boolean
  // 混沌
  whittling: boolean
  sinistralErasure: boolean
  dextralErasure: boolean
  // 剥离
  sinistralAnnulment: boolean
  dextralAnnulment: boolean
}

export type GenerateAddPoolOptions = {
  deduplication?: boolean
  filterByTags?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}

export type GenerateReplacePoolOptions = {
  lowestValue?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}

export type GenerateRemovePoolOptions = {
  onlyAbyssal?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}

export enum ITEM_TYPE {
  NORMAL = 'NORMAL',
  MAGIC = 'MAGIC',
  RARE = 'RARE',
}

export type PropsUseHistory = {
  transmutationOrb: boolean
  augmentationOrb: boolean
  regalOrb: boolean
  exaltedOrb: boolean
}
