const supportedStyleRules = ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight',
    'strike-through', 'text-align', 'text-decoration']

const supportedAttributes = ['border', 'src', 'alt', 'href']

export default {
    getAttributesWithoutStyle(element: HTMLElement): string[] {
        return Array.from(element.attributes)
            .filter((attribute) => supportedAttributes.includes(attribute.name))
            .map((attribute) => `${attribute.name}="${attribute.value}"`)
    },
    getComputedStyles(element: HTMLElement): string[] {
        const computedStyle = window.getComputedStyle(element)

        return supportedStyleRules.map((rule) => `${rule}:${computedStyle[rule]}`);
    },
    getInnerHtmlWithComputedStyle(element: HTMLElement): string {
        return Array.from(element.childNodes).map((child: HTMLElement) => {
            if (child.nodeType === 1) {
                    const tagName = child.tagName.toLowerCase()
                    const computedStyle = window.getComputedStyle(child)
                    const styles = this.getComputedStyles(child)
                    const attributes = this.getAttributesWithoutStyle(child).concat(`style="${styles.join(';')}"`)
                    const childHtml = this.getInnerHtmlWithComputedStyle(child)

                    switch (tagName) {
                        case 'blockquote':
                            return `
                                <table style="width: ${computedStyle.width};
                                background-color: ${computedStyle.backgroundColor}">
                                    <tr>
                                        <td>${childHtml}</td>
                                    </tr>
                                </table>`
                        case 'div':
                            if (child.classList.contains('MathJax_SVG_Display')) {
                                return child.querySelector('svg').outerHTML
                            }

                            break
                        case 'pre':
                            return `
                                <table style="width: ${computedStyle.width};
                                background-color: ${computedStyle.backgroundColor}">
                                    <tr>
                                        <td>
                                            <pre ${attributes.join(' ')}>${childHtml}</pre>
                                        </td>
                                    </tr>
                                </table>`
                        case 'span':
                            if (child.classList.contains('MathJax_SVG')) {
                                return child.querySelector('svg').outerHTML
                            }

                            break
                        case 'script':
                            return ''
                        default:
                            break
                    }

                    return `<${tagName} ${attributes.join(' ')}>${childHtml}</${tagName}>`
                } else if (child.nodeType === 3) {
                    return child.nodeValue
                } else {
                    return ''
                }
        }).join('')
    },
}
