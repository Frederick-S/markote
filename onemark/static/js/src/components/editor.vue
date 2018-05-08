<template>
    <div id="editor">
        <p>Hello World!</p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import Quill from 'quill'

    @Component
    export default class Editor extends Vue {
        mounted() {
            const quill = new Quill('#editor', {
                theme: 'snow'
            })
        }
    }
</script>
