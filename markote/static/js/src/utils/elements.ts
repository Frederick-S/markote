const supportedStyleRules = ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight',
    'strike-through', 'text-align', 'text-decoration']

const supportedAttributes = ['border', 'src', 'alt', 'href']

export default {
    getAttributesWithoutStyle(element: HTMLElement): string[] {
        return Array.from(element.attributes)
            .filter((attribute) => supportedAttributes.includes(attribute.name))
            .map((attribute) => `${attribute.name}="${attribute.value}"`)
    },
    getComputedStyles(element: HTMLElement): string {
        const computedStyle = window.getComputedStyle(element)

        return supportedStyleRules.map((rule) => `${rule}:${computedStyle[rule]}`).join(';')
    },
    getInnerHtmlWithComputedStyle(element: HTMLElement): string {
        return Array.from(element.childNodes).map((child: HTMLElement) => {
            if (child.nodeType === 1) {
                    const tagName = child.tagName.toLowerCase()
                    const style = this.getComputedStyles(child)
                    const attributes = this.getAttributesWithoutStyle(child).concat(`style="${style}"`)

                    switch (tagName) {
                        case 'div':
                            if (child.classList.contains('MathJax_SVG_Display')) {
                                return child.querySelector('svg').outerHTML
                            }
                        case 'span':
                            if (child.classList.contains('MathJax_SVG')) {
                                return child.querySelector('svg').outerHTML
                            }
                        case 'script':
                            return ''
                        default:
                            break
                    }

                    const childHtml = this.getInnerHtmlWithComputedStyle(child)

                    return `<${tagName} ${attributes.join(' ')}>${childHtml}</${tagName}>`
                } else if (child.nodeType === 3) {
                    return child.nodeValue
                } else {
                    return ''
                }
        }).join('')
    },
}
