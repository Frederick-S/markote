<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title" v-model="page.title">
        <p class="buttons">
            <a class="button" @click="preview">
                <b-icon icon="eye" size="is-small"></b-icon>
            </a>
            <a class="button" @click="save">
                <b-icon v-if="isSaving" icon="loading" size="is-small"></b-icon>
                <b-icon v-else icon="content-save" size="is-small"></b-icon>
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
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import GraphClient from '../graph-client'
    import renderer from '../marked/renderer'
    import Page from '../models/page'
    import toast from '../toast'
    import elements from '../utils/elements'

    declare var hljs: any

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        private isLoading = false

        private isPreview = false

        private isSaving = false

        private page = new Page()

        private mounted() {
            MathJax.Hub.Config({
                SVG: {
                    useGlobalCache: false,
                },
                tex2jax: {
                    displayMath: [['$$', '$$']],
                    inlineMath: [['$', '$']],
                },
            })

            this.editor = ace.edit('editor')
            this.editor.setTheme('ace/theme/tomorrow')
            this.editor.session.setMode('ace/mode/markdown')
        }

        @Watch('$route')
        private onRouteChanged(to, from) {
            switch (to.name) {
                case 'page':
                    this.page.id = to.params.pageId
                    this.page.title = to.params.pageTitle

                    if (to.params.isNewPage) {
                        this.page.markdown = ''

                        this.reset()
                    } else {
                        this.isLoading = true

                        GraphClient.getPageMarkdown(this.page.id).then((markdown: string) => {
                            this.page.markdown = markdown
                        }).catch(() => {
                            this.page.markdown = ''

                            toast.danger('Failed to get page content')

                            this.$router.push('/error')
                        }).finally(() => {
                            this.reset()
                        })
                    }

                    break
                case 'notebooks':
                case 'sections':
                case 'pages':
                    this.page = new Page()
                    this.reset()

                    break
                default:
                    break
            }
        }

        private preview() {
            this.isPreview = !this.isPreview

            if (this.isPreview) {
                this.renderPreview()
            }
        }

        private renderPreview() {
            const content = this.editor.getValue()
            const previewElement = document.getElementById('preview')

            previewElement.innerHTML = marked(content, {
                renderer,
            })

            Array.from(document.querySelectorAll('pre')).forEach((element) => {
                hljs.highlightBlock(element)
            })

            return new Promise((resolve, reject) => {
                MathJax.Hub.Queue(['Typeset', MathJax.Hub, previewElement])
                MathJax.Hub.Queue(() => {
                    resolve()
                })
            })
        }

        private reset() {
            this.isPreview = false
            this.isLoading = false
            this.editor.setValue(this.page.markdown, 1)

            document.getElementById('preview').innerHTML = ''
        }

        private save() {
            if (!this.page.id) {
                toast.danger('Please select a page first')

                return
            }

            this.isSaving = true
            this.isPreview = true

            this.renderPreview().then(() => {
                this.page.content = elements.getInnerHtmlWithComputedStyle(document.getElementById('preview'))
                this.page.markdown = this.editor.getValue()

                GraphClient.updatePageContent(this.page).catch((error) => {
                    toast.danger('Failed to save page content')
                }).finally(() => {
                    this.isSaving = false
                })
            })
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

    .spinner-wrap {
        height: 100%;
    }
</style>
