import { describe, it, expect } from 'vitest'
import { handleHTMLString } from './handleHTMLString'

describe('handleHTMLString', () => {
  it('should return an empty string for null or undefined input', () => {
    expect(handleHTMLString(null)).toBe('')
    expect(handleHTMLString(undefined)).toBe('')
  })

  it('should remove all tags when removeAllTags is true', () => {
    const html = '<div><p>Hello <strong>World</strong></p></div>'
    const result = handleHTMLString(html, { removeAllTags: true })
    expect(result).toBe('Hello World')
  })

  it('should strip specified tags and their content', () => {
    const html = '<div><script>alert("XSS")</script><p>Hello World</p></div>'
    const result = handleHTMLString(html, { stripTags: ['script'] })
    expect(result).toBe('<div><p>Hello World</p></div>')
  })

  it('should unwrap specified tags', () => {
    const html = '<div><span>Hello</span> <span>World</span></div>'
    const result = handleHTMLString(html, { unwrapTags: ['span'] })
    expect(result).toBe('<div>Hello World</div>')
  })

  it('should flatten anchors to plain text', () => {
    const html = '<div><a href="https://example.com">Click here</a></div>'
    const result = handleHTMLString(html, { flattenAnchors: true })
    expect(result).toBe('<div>Click here</div>')
  })

  it('should return the original HTML if no options are provided', () => {
    const html = '<div><p>Hello <strong>World</strong></p></div>'
    const result = handleHTMLString(html)
    expect(result).toBe(html)
  })
})
