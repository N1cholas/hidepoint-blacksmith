import { ITEM_TYPE } from '@/types/types'

export const processHTMLString = (htmlString: string) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  const spans = tempDiv.querySelectorAll('span')
  spans.forEach((span) => {
    span.replaceWith(...span.childNodes)
  })

  const links = tempDiv.querySelectorAll('a')
  links.forEach((link) => {
    const text = document.createTextNode(link.textContent || '')
    link.replaceWith(text)
  })

  const str = tempDiv.innerHTML

  return str
}

export const showItemTypeMsg = (itemType: ITEM_TYPE) => {
  switch (itemType) {
    case ITEM_TYPE.NORMAL:
      return '普通物品'
    case ITEM_TYPE.MAGIC:
      return '魔法物品'
    case ITEM_TYPE.RARE:
      return '稀有物品'
    default:
      return ''
  }
}
