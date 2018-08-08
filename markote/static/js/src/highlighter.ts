declare var hljs: any

class Highlighter {
    public highlightBlock(element) {
        hljs.highlightBlock(element)
    }

    public setTheme(theme: string) {
        // Todo
    }
}

const highlighter = new Highlighter()

export default highlighter
