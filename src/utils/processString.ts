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
