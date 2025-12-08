declare type Locale = 'zh_CN' | 'en_US'

declare type WeightWrapper<T> = {
  items: T
  weight: number
  id: string
  isPrefix: boolean
  tags: string[]
}
