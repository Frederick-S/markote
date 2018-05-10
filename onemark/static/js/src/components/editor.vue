<template>
    <div class="column editor">
        <input class="input page-title" type="text" placeholder="Title">
        <div id="editor" class="editor">
            <p>Hello World!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import Quill from 'quill'

    @Component
    export default class Editor extends Vue {
        mounted() {
            const quill = new Quill('#editor', {
                modules: {
                    toolbar: false
                },
                theme: 'snow'
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
</style>
