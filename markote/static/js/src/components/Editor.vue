<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title">
        <p class="buttons">
            <a class="button">
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
        <div id="editor" class="editor-body">
            <p>Hello World!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    @Component
    export default class Editor extends Vue {
        private editor!: AceAjax.Editor

        mounted() {
            this.editor = ace.edit('editor')
            this.editor.setTheme('ace/theme/github')
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
</style>
