<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title">
        <div id="editor" class="editor-body">
            <p>Hello World!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    declare var ace: any

    @Component
    export default class Editor extends Vue {
        mounted() {
            const editor = ace.edit('editor')
            editor.setTheme('ace/theme/github')
            editor.session.setMode('ace/mode/markdown')
            editor.renderer.setShowGutter(false)
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
