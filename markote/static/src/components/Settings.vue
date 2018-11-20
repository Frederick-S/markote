<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Settings</p>
            <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
            <b-field label="Editor Theme">
                <b-select placeholder="Select a theme" expanded v-model="config.editorTheme">
                    <optgroup label="Bright">
                        <option v-for="(theme, key) in editorThemes.bright" :value="key" :key="key">{{ theme }}</option>
                    </optgroup>
                    <optgroup label="Dark">
                        <option v-for="(theme, key) in editorThemes.dark" :value="key" :key="key">{{ theme }}</option>
                    </optgroup>
                </b-select>
            </b-field>
            <div id="editor-example" class="editor-example"></div>
            <b-field label="Code Theme">
                <b-select placeholder="Select a theme" expanded v-model="config.codeTheme">
                    <option v-for="(theme, key) in codeThemes" :value="key" :key="key">{{ theme }}</option>
                </b-select>
            </b-field>
            <div id="code-highlighter">
                <pre>
                    <code>
                        {{ codeExample }}
                    </code>
                </pre>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="save">OK</button>
            <button class="button" @click="close">Cancel</button>
        </footer>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { Action, State } from 'vuex-class'
    import bus from '../bus'
    import highlighter from '../highlighter'
    import Config from '../models/config'
    import toast from '../toast'

    @Component
    export default class Settings extends Vue {
        private codeHighlighter!: HTMLElement

        private editor!: AceAjax.Editor

        @State(state => state.settings.codeExample) codeExample

        @State(state => state.settings.codeThemes) codeThemes

        @State(state => state.settings.editorThemes) editorThemes

        @State(state => state.settings.markdownExample) markdownExample

        @State(state => state.config.config) config: Config

        @Action('config/getConfig') getConfig

        @Action('config/updateConfig') updateConfig

        private close() {
            (this.$parent as any).close()
        }

        private mounted() {
            this.getConfig().then(() => {
                this.init()
            })
        }

        private init() {
            this.codeHighlighter = document.getElementById('code-highlighter')
            this.editor = ace.edit('editor-example')
            this.editor.setTheme(this.config.editorTheme)
            this.editor.session.setMode('ace/mode/markdown')
            this.editor.setValue(this.markdownExample, 1)

            Array.from(this.codeHighlighter.querySelectorAll('pre')).forEach((element) => {
                highlighter.highlightBlock(element)
            })

            highlighter.setTheme(this.config.codeTheme)
        }

        @Watch('config.codeTheme')
        private onCodeThemeChanged(value, oldValue) {
            highlighter.setTheme(value)
        }

        @Watch('config.editorTheme')
        private onEditorThemeChanged(value, oldValue) {
            !this.editor || this.editor.setTheme(value)
        }

        private save() {
            this.updateConfig(this.config).then(() => {
                bus.$emit('updateConfig')

                this.close()
            }).catch((error) => {
                toast.danger('Failed to update config')
            })
        }
    }
</script>

<style>
    .editor-example {
        height: 220px;
        border: 1px solid #cccccc;
    }
</style>