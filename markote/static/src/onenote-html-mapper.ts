/*
Converts OneNote supported html to standard html.
 */
export default class OneNoteHtmlMapper {
    public static convert(html: string): string {
        const div = document.createElement('div')
        div.innerHTML = html

        Array.from(div.children).forEach((node) => {
            const style = (node as HTMLElement).style

            if (style.position === 'absolute') {
                style.removeProperty('position')
            }
        })

        Array.from(div.querySelectorAll('img')).forEach((image: HTMLImageElement) => {
            const resourceId = image.src.match(/resources\/(.+)\/\$value/)[1]

            if (resourceId) {
                image.classList.add('loading')
                image.src = 'images/loading.gif'
                image.setAttribute('data-src', `/api/v1/resources/${resourceId}/content`)
            }
        })

        return div.innerHTML
    }
}
