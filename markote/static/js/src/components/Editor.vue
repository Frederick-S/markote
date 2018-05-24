<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title" v-model="page.title">
        <p class="buttons">
            <a class="button" @click="preview">
                <span class="icon is-small">
                    <i class="fas fa-eye"></i>
                </span>
            </a>
            <a class="button" @click="save">
                <span class="icon is-small">
                    <i class="fas fa-save"></i>
                </span>
            </a>
        </p>
        <div v-show="isLoading" class="spinner-wrap">
            <div class="spinner button is-loading"></div>
        </div>
        <div v-show="!isLoading && !isPreview" id="editor" class="editor-body"></div>
        <div v-show="!isLoading && isPreview" class="preview content" id="preview"></div>
    </div>
</template>

<script lang="ts">
    import * as marked from 'marked'
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import renderer from '../marked/renderer'
    import Page from '../models/page'
    import pageStore from '../stores/page'

    declare var hljs: any

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        private isLoading = false

        private isPreview = false

        private page = new Page()

        private getComputedStyle(element: HTMLElement): string {
            const computedStyle = window.getComputedStyle(element)
            const supportedStyleRules = ['background-color', 'color', 'font-family', 'font-size', 'font-style',
                'font-weight', 'strike-through', 'text-align', 'text-decoration']

            return supportedStyleRules.map((rule) => `${rule}:${computedStyle[rule]}`).join(';')
        }

        private getInnerHtmlWithComputedStyle(element: HTMLElement): string {
            return Array.prototype.map.call(element.childNodes, (child: HTMLElement) => {
                if (child.nodeType === 1) {
                    const tagName = child.tagName.toLowerCase()
                    const style = this.getComputedStyle(child)
                    const childHtml = this.getInnerHtmlWithComputedStyle(child)

                    if (tagName === 'table') {
                        return `<${tagName} style="${style}" border="1">${childHtml}</${tagName}>`
                    } else {
                        return `<${tagName} style="${style}">${childHtml}</${tagName}>`
                    }
                } else if (child.nodeType === 3) {
                    return child.nodeValue
                } else {
                    return ''
                }
            }).join('')
        }

        private mounted() {
            this.editor = ace.edit('editor')
            this.editor.setTheme('ace/theme/tomorrow')
            this.editor.session.setMode('ace/mode/markdown')

            event.listen(events.NEW_PAGE, this.newPage)
            event.listen(events.RENDER_PAGE, this.renderPage)
            event.listen(events.RESET_EDITOR, this.reset)
        }

        private newPage(page: Page) {
            this.reset(page)
        }

        private preview() {
            this.isPreview = !this.isPreview

            if (this.isPreview) {
                this.renderPreview()
            }
        }

        private renderPage(page: Page) {
            this.isLoading = true
            this.page = page

            pageStore.dispatch('getPageMarkdown', page).then((markdown: string) => {
                page.markdown = markdown

                this.reset(page)
            })
        }

        private renderPreview() {
            const content = this.editor.getValue()

            document.getElementById('preview')!.innerHTML = marked(content, {
                renderer,
            })

            Array.prototype.forEach.call(document.querySelectorAll('pre'), (element: any) => {
                hljs.highlightBlock(element)
            })
        }

        private reset(page) {
            this.isPreview = false
            this.isLoading = false
            this.page = page || new Page()
            this.editor.setValue(this.page.markdown, 1)

            document.getElementById('preview').innerHTML = ''
        }

        private save() {
            this.renderPreview()
            this.page.content = this.getInnerHtmlWithComputedStyle(document.getElementById('preview'))
            this.page.markdown = this.editor.getValue()

            pageStore.dispatch('updatePage', this.page)
        }
    }
</script>

<style>
    .editor {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    input.page-title {
        margin-bottom: 1rem;
    }

    .editor-body {
        height: 100%;
        border: 1px solid #cccccc;
    }

    .preview {
        height: 100%;
        border: 1px solid #cccccc;
        overflow: auto;
        padding: 1rem;
    }

    pre.hljs {
        background-color: white;
    }

    .spinner-wrap {
        height: 100%;
    }
</style>
