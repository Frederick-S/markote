import * as marked from 'marked'

const renderer = new marked.Renderer()

renderer.heading = (text, level): string => {
    return `<h${level} class="title is-${level}">${text}</h${level}>`
}

renderer.table = (header, body) => {
    return `
        <table class="table is-bordered is-fullwidth" border="1">
            <thead>${header}</thead>
            <tbody>${body}</tbody>
        </table>`
}

export default renderer
