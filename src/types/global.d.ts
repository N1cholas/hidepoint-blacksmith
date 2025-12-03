declare type Locale = 'zh_CN' | 'en_US'

declare type WeightWrapper<T> = {
  items: T
  weight: number
  id: string
  isPrefix: boolean
  tags: string[]
}

declare type OmenConfig = {
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
  // session3
  abyssalEchoes: boolean
  sinistralNecromancy: boolean
  dextralNecromancy: boolean
  light: boolean
}
