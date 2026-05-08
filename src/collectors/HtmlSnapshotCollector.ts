import { Page } from '@playwright/test'

const ALLOWED_TAGS = new Set([
  'html',
  'body',
  'main',
  'section',
  'form',
  'div',
  'span',
  'button',
  'input',
  'textarea',
  'select',
  'option',
  'label',
  'a',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
])

const ALLOWED_ATTRS = new Set([
  'id',
  'class',
  'name',
  'type',
  'role',
  'aria-label',
  'aria-labelledby',
  'placeholder',
  'data-testid',
  'data-test',
  'data-cy',
  'href',
  'disabled',
  'checked',
  'value',
])

export async function collectSanitizedHtmlSnapshot(page: Page) {
  return await page.evaluate(
    ({ allowedTags, allowedAttrs }) => {
      const tagSet = new Set(allowedTags)
      const attrSet = new Set(allowedAttrs)

      function sanitizeNode(node: Node): string {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim()
          return text ? text.slice(0, 120) : ''
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return ''

        const el = node as Element
        const tag = el.tagName.toLowerCase()

        if (!tagSet.has(tag)) {
          return Array.from(el.childNodes).map(sanitizeNode).join('')
        }

        const attrs = Array.from(el.attributes)
          .filter((attr) => attrSet.has(attr.name))
          .map((attr) => `${attr.name}="${attr.value.slice(0, 120)}"`)
          .join(' ')

        const children = Array.from(el.childNodes).map(sanitizeNode).join('')

        return `<${tag}${attrs ? ` ${attrs}` : ''}>${children}</${tag}>`
      }

      return sanitizeNode(document.documentElement)
    },
    {
      allowedTags: Array.from(ALLOWED_TAGS),
      allowedAttrs: Array.from(ALLOWED_ATTRS),
    },
  )
}