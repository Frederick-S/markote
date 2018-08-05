<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Settings</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Editor Theme">
                <b-select expanded>
                    <option>Chrome</option>
                    <option>Clouds</option>
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
    import { Component, Vue } from 'vue-property-decorator'
    import Config from '../models/config'
    import configStore from '../stores/config'

    @Component
    export default class Settings extends Vue {
        private editor!: AceAjax.Editor

        get config(): Config {
            return configStore.state.config
        }

        private close() {
            const $parent: any = this.$parent

            $parent.close()
        }

        private mounted() {
            this.editor = ace.edit('editor-example')
            this.editor.setTheme(`ace/theme/${this.config.editorTheme}`)
            this.editor.session.setMode('ace/mode/markdown')
        }
    }
</script>

<style>
    .editor-example {
        height: 200px;
        border: 1px solid #cccccc;
    }
</style>