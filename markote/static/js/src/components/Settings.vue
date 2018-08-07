<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Settings</p>
            <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
            <b-field label="Editor Theme">
                <b-select placeholder="Select a theme" expanded v-model="editorTheme">
                    <optgroup label="Bright">
                        <option value="ace/theme/chrome">Chrome</option>
                        <option value="ace/theme/clouds">Clouds</option>
                        <option value="ace/theme/crimson_editor">Crimson Editor</option>
                        <option value="ace/theme/dawn">Dawn</option>
                        <option value="ace/theme/dreamweaver">Dreamweaver</option>
                        <option value="ace/theme/eclipse">Eclipse</option>
                        <option value="ace/theme/github">GitHub</option>
                        <option value="ace/theme/iplastic">IPlastic</option>
                        <option value="ace/theme/solarized_light">Solarized Light</option>
                        <option value="ace/theme/textmate">TextMate</option>
                        <option value="ace/theme/tomorrow">Tomorrow</option>
                        <option value="ace/theme/xcode">XCode</option>
                        <option value="ace/theme/kuroir">Kuroir</option>
                        <option value="ace/theme/katzenmilch">KatzenMilch</option>
                        <option value="ace/theme/sqlserver">SQL Server</option>
                    </optgroup>
                    <optgroup label="Dark">
                        <option value="ace/theme/ambiance">Ambiance</option>
                        <option value="ace/theme/chaos">Chaos</option>
                        <option value="ace/theme/clouds_midnight">Clouds Midnight</option>
                        <option value="ace/theme/dracula">Dracula</option>
                        <option value="ace/theme/cobalt">Cobalt</option>
                        <option value="ace/theme/gruvbox">Gruvbox</option>
                        <option value="ace/theme/gob">Green on Black</option>
                        <option value="ace/theme/idle_fingers">idle Fingers</option>
                        <option value="ace/theme/kr_theme">krTheme</option>
                        <option value="ace/theme/merbivore">Merbivore</option>
                        <option value="ace/theme/merbivore_soft">Merbivore Soft</option>
                        <option value="ace/theme/mono_industrial">Mono Industrial</option>
                        <option value="ace/theme/monokai">Monokai</option>
                        <option value="ace/theme/pastel_on_dark">Pastel on dark</option>
                        <option value="ace/theme/solarized_dark">Solarized Dark</option>
                        <option value="ace/theme/terminal">Terminal</option>
                        <option value="ace/theme/tomorrow_night">Tomorrow Night</option>
                        <option value="ace/theme/tomorrow_night_blue">Tomorrow Night Blue</option>
                        <option value="ace/theme/tomorrow_night_bright">Tomorrow Night Bright</option>
                        <option value="ace/theme/tomorrow_night_eighties">Tomorrow Night 80s</option>
                        <option value="ace/theme/twilight">Twilight</option>
                        <option value="ace/theme/vibrant_ink">Vibrant Ink</option>
                    </optgroup>
                </b-select>
            </b-field>
            <div id="editor-example" class="editor-example"></div>
            <b-field label="Code Theme">
                <b-select expanded>
                    <option>Default</option>
                    <option>Agate</option>
                </b-select>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success">OK</button>
            <button class="button" @click="close">Cancel</button>
        </footer>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import Config from '../models/config'
    import configStore from '../stores/config'

    @Component
    export default class Settings extends Vue {
        private editor!: AceAjax.Editor

        private editorTheme: string = ''

        get config(): Config {
            return configStore.state.config
        }

        private close() {
            this.editorTheme = ''

            const $parent: any = this.$parent

            $parent.close()
        }

        private mounted() {
            this.editorTheme = this.config.editorTheme
            this.editor = ace.edit('editor-example')
            this.editor.setTheme(`${this.config.editorTheme}`)
            this.editor.session.setMode('ace/mode/markdown')
            this.editor.setValue(`# H1
## H2

1. First item
2. Second item
3. Third item

[Link](https://www.google.com)

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |`, 1)
        }

        @Watch('editorTheme')
        private onEditorThemeChanged(value, oldValue) {
            this.editor.setTheme(value)
        }
    }
</script>

<style>
    .editor-example {
        height: 200px;
        border: 1px solid #cccccc;
    }
</style>