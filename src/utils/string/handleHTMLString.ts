export interface HandleHTMLOptions {
  unwrapTags?: string[] // 仅移除自身标签，保留内部内容
  flattenAnchors?: boolean // <a> => 纯文本
  stripTags?: string[] // 整个标签块删除（含内容）
  allowTags?: string[] // 保留列表（非列表标签全部去掉，仅输出文本）；优先级高于其它
  removeAllTags?: boolean // 强制纯文本输出
}

const DEFAULT_OPTS: HandleHTMLOptions = {
  unwrapTags: ['span'],
  flattenAnchors: true,
  stripTags: ['script', 'style'],
}

export function handleHTMLString(
  html: string | null | undefined,
  opts: HandleHTMLOptions = {},
): string {
  if (!html) return ''
  const { unwrapTags, flattenAnchors, stripTags, allowTags, removeAllTags } = {
    ...DEFAULT_OPTS,
    ...opts,
  }

  // 纯文本模式直接返回
  if (removeAllTags) return html.replace(/<[^>]*>/g, '')

  const hasDOM = typeof document !== 'undefined' && typeof window !== 'undefined'

  // allowTags 模式：保留指定，其它剥离标签
  if (allowTags?.length) {
    return stripOutsideTags(html, allowTags)
  }

  if (!hasDOM) {
    // Node 环境降级处理
    let out = html

    // 删除 stripTags（含内容）
    if (stripTags?.length) {
      for (const t of stripTags) {
        const re = new RegExp(`<\\s*${t}\\b[\\s\\S]*?<\\s*/\\s*${t}\\s*>`, 'gi')
        out = out.replace(re, '')
      }
    }
    // 解包 unwrapTags
    if (unwrapTags?.length) {
      for (const t of unwrapTags) {
        const reOpen = new RegExp(`<\\s*${t}\\b[^>]*>`, 'gi')
        const reClose = new RegExp(`<\\s*/\\s*${t}\\s*>`, 'gi')
        out = out.replace(reOpen, '').replace(reClose, '')
      }
    }
    // 扁平 a
    if (flattenAnchors) {
      out = out.replace(/<\s*a\b[^>]*>([\s\S]*?)<\s*\/\s*a\s*>/gi, '$1')
    }
    return out
  }

  // 浏览器解析
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  const root = tpl.content

  // 删除 stripTags
  if (stripTags?.length) {
    for (const tag of stripTags) root.querySelectorAll(tag).forEach((el) => el.remove())
  }

  // 解包 unwrapTags
  if (unwrapTags?.length) {
    for (const tag of unwrapTags) {
      root.querySelectorAll(tag).forEach((el) => {
        const parent = el.parentNode
        if (!parent) return
        const frag = document.createDocumentFragment()
        while (el.firstChild) frag.appendChild(el.firstChild)
        parent.replaceChild(frag, el)
      })
    }
  }

  // 扁平 a
  if (flattenAnchors) {
    root.querySelectorAll('a').forEach((a) => {
      const parent = a.parentNode
      if (!parent) return
      parent.replaceChild(document.createTextNode(a.textContent ?? ''), a)
    })
  }

  return tpl.innerHTML
}

/* 保留指定标签，其它全部剥离为纯文本 */
function stripOutsideTags(html: string, allow: string[]): string {
  // 删除 disallowed block tags first (script/style etc.)
  html = html
    .replace(/<\s*script\b[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*style\b[\s\S]*?<\s*\/\s*style\s*>/gi, '')

  // 保留 allow，其它标签去掉（仅标签符号，不移除内容）
  return html.replace(/<([^>]+)>/gi, (m, inner) => {
    const tag = inner.trim().split(/\s+/)[0].replace(/\/.*/, '').toLowerCase()
    if (allow.includes(tag)) return m
    return '' // 去掉整个标签
  })
}
