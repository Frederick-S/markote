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
                <b-select placeholder="Select a theme" expanded v-model="codeTheme">
                    <option value="default">Default</option>
                    <option value="agate">Agate</option>
                    <option value="androidstudio">Androidstudio</option>
                    <option value="arduino-light">Arduino Light</option>
                    <option value="arta">Arta</option>
                    <option value="ascetic">Ascetic</option>
                    <option value="atelier-cave-dark">Atelier Cave Dark</option>
                    <option value="atelier-cave-light">Atelier Cave Light</option>
                    <option value="atelier-dune-dark">Atelier Dune Dark</option>
                    <option value="atelier-dune-light">Atelier Dune Light</option>
                    <option value="atelier-estuary-dark">Atelier Estuary Dark</option>
                    <option value="atelier-estuary-light">Atelier Estuary Light</option>
                    <option value="atelier-forest-dark">Atelier Forest Dark</option>
                    <option value="atelier-forest-light">Atelier Forest Light</option>
                    <option value="atelier-heath-dark">Atelier Heath Dark</option>
                    <option value="atelier-heath-light">Atelier Heath Light</option>
                    <option value="atelier-lakeside-dark">Atelier Lakeside Dark</option>
                    <option value="atelier-lakeside-light">Atelier Lakeside Light</option>
                    <option value="atelier-plateau-dark">Atelier Plateau Dark</option>
                    <option value="atelier-plateau-light">Atelier Plateau Light</option>
                    <option value="atelier-savanna-dark">Atelier Savanna Dark</option>
                    <option value="atelier-savanna-light">Atelier Savanna Light</option>
                    <option value="atelier-seaside-dark">Atelier Seaside Dark</option>
                    <option value="atelier-seaside-light">Atelier Seaside Light</option>
                    <option value="atelier-sulphurpool-dark">Atelier Sulphurpool Dark</option>
                    <option value="atelier-sulphurpool-light">Atelier Sulphurpool Light</option>
                    <option value="atom-one-dark">Atom One Dark</option>
                    <option value="atom-one-light">Atom One Light</option>
                    <option value="brown-paper">Brown Paper</option>
                    <option value="codepen-embed">Codepen Embed</option>
                    <option value="color-brewer">Color Brewer</option>
                    <option value="darcula">Darcula</option>
                    <option value="dark">Dark</option>
                    <option value="darkula">Darkula</option>
                    <option value="docco">Docco</option>
                    <option value="dracula">Dracula</option>
                    <option value="far">Far</option>
                    <option value="foundation">Foundation</option>
                    <option value="github-gist">Github Gist</option>
                    <option value="github">Github</option>
                    <option value="googlecode">Googlecode</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="gruvbox-dark">Gruvbox Dark</option>
                    <option value="gruvbox-light">Gruvbox Light</option>
                    <option value="hopscotch">Hopscotch</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="idea">Idea</option>
                    <option value="ir-black">Ir Black</option>
                    <option value="kimbie.dark">Kimbie Dark</option>
                    <option value="kimbie.light">Kimbie Light</option>
                    <option value="magula">Magula</option>
                    <option value="mono-blue">Mono Blue</option>
                    <option value="monokai-sublime">Monokai Sublime</option>
                    <option value="monokai">Monokai</option>
                    <option value="obsidian">Obsidian</option>
                    <option value="ocean">Ocean</option>
                    <option value="paraiso-dark">Paraiso Dark</option>
                    <option value="paraiso-light">Paraiso Light</option>
                    <option value="pojoaque">Pojoaque</option>
                    <option value="purebasic">Purebasic</option>
                    <option value="qtcreator_dark">Qtcreator Dark</option>
                    <option value="qtcreator_light">Qtcreator Light</option>
                    <option value="railscasts">Railscasts</option>
                    <option value="rainbow">Rainbow</option>
                    <option value="routeros">Routeros</option>
                    <option value="school-book">School Book</option>
                    <option value="solarized-dark">Solarized Dark</option>
                    <option value="solarized-light">Solarized Light</option>
                    <option value="sunburst">Sunburst</option>
                    <option value="tomorrow-night-blue">Tomorrow Night Blue</option>
                    <option value="tomorrow-night-bright">Tomorrow Night Bright</option>
                    <option value="tomorrow-night-eighties">Tomorrow Night Eighties</option>
                    <option value="tomorrow-night">Tomorrow Night</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="vs">Vs</option>
                    <option value="vs2015">Vs 2015</option>
                    <option value="xcode">Xcode</option>
                    <option value="xt256">Xt 256</option>
                    <option value="zenburn">Zenburn</option>
                </b-select>
            </b-field>
            <div class="code-example">
                <pre>
                    <code>
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}

export  $initHighlight;
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
    import db from '../db'
    import highlighter from '../highlighter'
    import Config from '../models/config'
    import configStore from '../stores/config'

    @Component
    export default class Settings extends Vue {
        private editor!: AceAjax.Editor

        private editorTheme: string = ''

        private codeTheme: string = ''

        get config(): Config {
            return configStore.state.config
        }

        private close() {
            this.editorTheme = ''
            this.codeTheme = ''

            const $parent: any = this.$parent

            $parent.close()
        }

        private mounted() {
            this.editorTheme = this.config.editorTheme
            this.codeTheme = this.config.codeTheme

            this.editor = ace.edit('editor-example')
            this.editor.setTheme(this.editorTheme)
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

            Array.from(document.querySelectorAll('pre')).forEach((element) => {
                highlighter.highlightBlock(element)
            })

            highlighter.setTheme(this.codeTheme)
        }

        @Watch('codeTheme')
        private onCodeThemeChanged(value, oldValue) {
            highlighter.setTheme(value)
        }

        @Watch('editorTheme')
        private onEditorThemeChanged(value, oldValue) {
            this.editor.setTheme(value)
        }

        private save() {
            this.config.editorTheme = this.editorTheme
            this.config.codeTheme = this.codeTheme

            db.setItem('config', this.config).finally(() => {
                configStore.commit('setConfig', this.config)

                this.close()
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