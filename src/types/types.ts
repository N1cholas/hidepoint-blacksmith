export type WeightWrapper<T> = {
  value: any
  items: T
  weight: number
  id: string
  modGenerationTypeID: number
  tags: string[]
}

export type Modifier = {
  Name: string
  Level: number
  ModGenerationTypeID: number
  ModFamilyList: string[]
  DropChance: number
  str: string
  fossil_no: string[]
  mod_no: string[]
  mod_fossil_item: []
  hover: string
  powerLevel: number
}

export type BowNormalModData = {
  normal: WeightWrapper<Modifier>[]
}

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
}

export type GeneratePoolConfig = {
  deduplication?: boolean
  filterByTags?: boolean
  onlyPrefix?: boolean
  onlySuffix?: boolean
}
