import { describe, it, expect } from 'vitest'
import { processHTMLString } from '@/utils/processString'

describe('processHTMLString', () => {
  it('should remove <span> tags but keep their content', () => {
    const input = '<div><span>Hello</span> World</div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div>Hello World</div>')
  })

  it('should remove <a> tags but keep their text content', () => {
    const input = '<div><a href="https://example.com">Click here</a></div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div>Click here</div>')
  })

  it('should handle nested <span> and <a> tags correctly', () => {
    const input = '<div><span><a href="https://example.com">Link</a></span></div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div>Link</div>')
  })

  it('should handle empty <span> and <a> tags', () => {
    const input = '<div><span></span><a href="https://example.com"></a></div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div></div>')
  })

  it('should return the same string if there are no <span> or <a> tags', () => {
    const input = '<div><p>Hello World</p></div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div><p>Hello World</p></div>')
  })

  it('should handle multiple <span> and <a> tags', () => {
    const input =
      '<div><span>One</span> <a href="https://example.com">Two</a> <span>Three</span></div>'
    const output = processHTMLString(input)
    expect(output).toBe('<div>One Two Three</div>')
  })
})
