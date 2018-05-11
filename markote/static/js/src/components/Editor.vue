<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title">
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
        <div v-show="!isPreview" id="editor" class="editor-body">
            <p>Hello World!</p>
        </div>
        <div v-show="isPreview" class="preview" id="preview"></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import * as marked from 'marked'

    declare var hljs: any

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        private isPreview = false

        preview() {
            this.isPreview = !this.isPreview

            if (this.isPreview) {
                this.renderPreview()
            }
        }

        renderPreview() {
            const content = this.editor.getValue()
            const markedContent = marked(content)

            document.getElementById('preview')!.innerHTML = markedContent

            Array.prototype.forEach.call(document.querySelectorAll('pre code'), (item: any) => {
                hljs.highlightBlock(item)
            })
        }

        mounted() {
            this.editor = ace.edit('editor')
            this.editor.setTheme('ace/theme/tomorrow')
            this.editor.session.setMode('ace/mode/markdown')
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
    }
</style>
