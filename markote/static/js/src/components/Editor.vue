<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title" v-model="page.title">
        <p class="buttons">
            <a class="button" @click="preview">
                <span class="icon is-small">
                    <i class="fas fa-eye"></i>
                </span>
            </a>
            <a class="button">
                <span class="icon is-small">
                    <i class="fas fa-save"></i>
                </span>
            </a>
        </p>
        <div v-show="!isPreview" id="editor" class="editor-body"></div>
        <div v-show="isPreview" class="preview" id="preview"></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import * as marked from 'marked'
    import renderer from '../marked/renderer'
    import event from '../event'
    import events from '../events'

    declare var hljs: any

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        private isPreview = false

        private page = {}

        preview() {
            this.isPreview = !this.isPreview

            if (this.isPreview) {
                this.renderPreview()
            }
        }

        renderPreview() {
            const content = this.editor.getValue()
            const markedContent = marked(content, {
                renderer
            })

            document.getElementById('preview')!.innerHTML = markedContent

            Array.prototype.forEach.call(document.querySelectorAll('pre'), (element: any) => {
                hljs.highlightBlock(element)
            })
        }

        newPageCreated(page) {
            this.page = page
            this.editor.setValue('')
        }

        mounted() {
            this.editor = ace.edit('editor')
            this.editor.setTheme('ace/theme/tomorrow')
            this.editor.session.setMode('ace/mode/markdown')

            event.listen(events.NEW_PAGE, this.newPageCreated)
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
</style>
