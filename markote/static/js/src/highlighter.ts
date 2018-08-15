declare var hljs: any

class Highlighter {
    public highlightBlock(element) {
        hljs.highlightBlock(element)
    }

    public setTheme(theme: string) {
        const id = 'highlightjs-theme'
        const head = document.head
        const link = document.createElement('link')
        const currentStyle = document.getElementById(id)

        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${theme}.min.css`
        link.id = id

        if (currentStyle) {
            currentStyle.parentNode.removeChild(currentStyle)
        }

        head.appendChild(link)
    }
}

const highlighter = new Highlighter()

export default highlighter
