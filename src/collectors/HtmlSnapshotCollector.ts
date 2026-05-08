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

export async function collectSanitizedHtmlSnapshot(page: Page, maxNodes = 500) {
    return await page.evaluate(
      ({ allowedTags, allowedAttrs, maxNodes }) => {
        const tagSet = new Set(allowedTags);
        const attrSet = new Set(allowedAttrs);
        let nodeCount = 0;
        let output = "";
  
        // Khai báo kiểu rõ ràng cho Stack
        const stack: Array<[Element, number]> = [[document.body, 0]];
  
        while (stack.length > 0 && nodeCount < maxNodes) {
          const entry = stack.pop();
          if (!entry) continue; // Fix lỗi ts(2488)
  
          const [node, depth] = entry;
  
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();
  
            const isHidden = el.offsetWidth === 0 && el.offsetHeight === 0;
            if (isHidden && tag !== 'body' && tag !== 'html') continue;
  
            if (tagSet.has(tag)) {
              nodeCount++;
              
              // Fix lỗi 'attr' is unknown bằng cách ép kiểu (attr: any)
              const attrs = Array.from(el.attributes)
                .filter((attr: any) => attrSet.has(attr.name))
                .map((attr: any) => `${attr.name}="${attr.value.slice(0, 80)}"`)
                .join(" ");
  
              let text = "";
              // Đảm bảo childNodes không gây lỗi
              const childrenArr = Array.from(el.childNodes || []);
              for (const child of childrenArr) {
                if (child.nodeType === Node.TEXT_NODE) {
                  const content = child.textContent?.trim();
                  if (content) {
                    text = content.slice(0, 50);
                    break; 
                  }
                }
              }
  
              output += `<${tag}${attrs ? " " + attrs : ""}>${text}`;
            }
  
            const children = el.children;
            if (children) {
              for (let i = children.length - 1; i >= 0; i--) {
                stack.push([children[i] as Element, depth + 1]);
              }
            }
          }
        }
  
        return output;
      },
      {
        allowedTags: Array.from(ALLOWED_TAGS),
        allowedAttrs: Array.from(ALLOWED_ATTRS),
        maxNodes,
      }
    );
  }