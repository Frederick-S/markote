import * as marked from 'marked'

const renderer = new marked.Renderer()

renderer.heading = (text, level): string => {
    return `<h${level} class="title is-${level}">${text}</h${level}>`
}

export default renderer
