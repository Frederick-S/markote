<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title" v-model="page.title">
        <p class="buttons">
            <a class="button" @click="save">
                <b-icon v-if="isSaving" icon="spinner" size="is-small"></b-icon>
                <b-icon v-else icon="save" size="is-small"></b-icon>
            </a>
        </p>
        <div v-show="isLoading" class="spinner-wrap">
            <div class="spinner button is-loading"></div>
        </div>
        <div v-show="!isLoading" class="columns note-body">
            <div id="editor" class="column is-6 editor-body"></div>
            <div class="column is-6 preview content" id="preview"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import * as marked from 'marked'
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import bus from '../bus'
    import db from '../db'
    import GraphClient from '../graph-client'
    import highlighter from '../highlighter'
    import renderer from '../marked/renderer'
    import Config from '../models/config'
    import Page from '../models/page'
    import configStore from '../stores/config'
    import toast from '../toast'
    import elements from '../utils/elements'

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        private isLoading = false

        private isSaving = false

        private page = new Page()

        get config(): Config {
            return configStore.state.config
        }

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
            this.editor.session.setMode('ace/mode/markdown')
            this.editor.session.on('change', this.renderPreview)

            configStore.dispatch('getConfig').then(() => {
                this.editor.setTheme(this.config.editorTheme)

                highlighter.setTheme(this.config.codeTheme)
            })
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

                        db.getItem(`pages/${this.page.id}`).then((page: Page) => {
                            this.page.markdown = page.markdown

                            this.reset()
                        }).catch(() => {
                            GraphClient.getPageMarkdown(this.page.id).then((markdown: string) => {
                                this.page.markdown = markdown

                                db.setItem(`pages/${this.page.id}`, this.page)
                            }).catch(() => {
                                this.page.markdown = ''

                                toast.danger('Failed to get page content')

                                this.$router.push('/error')
                            }).finally(() => {
                                this.reset()
                            })
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

        private renderPreview() {
            const content = this.editor.getValue()
            const previewElement = document.getElementById('preview')

            previewElement.innerHTML = marked(content, {
                renderer,
            })

            Array.from(document.querySelectorAll('pre')).forEach((element) => {
                highlighter.highlightBlock(element)
            })

            return new Promise((resolve, reject) => {
                MathJax.Hub.Queue(['Typeset', MathJax.Hub, previewElement])
                MathJax.Hub.Queue(() => {
                    resolve()
                })
            })
        }

        private reset() {
            this.isLoading = false
            this.editor.setValue(this.page.markdown, 1)

            if (this.page.markdown) {
                this.renderPreview()
            } else {
                document.getElementById('preview').innerHTML = ''
            }
        }

        private save() {
            if (!this.page.id) {
                toast.danger('Please select a page first')

                return
            }

            this.isSaving = true

            this.page.content = elements.getInnerHtmlWithComputedStyle(document.getElementById('preview'))
            this.page.markdown = this.editor.getValue()

            GraphClient.updatePageContent(this.page).then(() => {
                db.setItem(`pages/${this.page.id}`, this.page)

                bus.$emit('updatePage', this.page)
            }).catch((error) => {
                toast.danger('Failed to save page content')
            }).finally(() => {
                this.isSaving = false
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

    .note-body {
        flex: 1;
        margin: 0;
    }

    .columns.note-body {
        margin-bottom: 0;
    }

    .editor-body {
        height: 100%;
        border: 1px solid #cccccc;
    }

    .preview {
        height: 100%;
        border: 1px solid #cccccc;
        border-left: none;
        overflow: auto;
        padding: 1rem;
    }

    .spinner-wrap {
        height: 100%;
    }
</style>