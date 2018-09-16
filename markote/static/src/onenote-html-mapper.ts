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

        return div.innerHTML
    }
}
