<template>
    <div class="container">
        <navigation-component></navigation-component>
        <div class="columns notes-main">
            <div class="column is-5">
                <div class="columns notes-navigation">
                    <notebooks-component></notebooks-component>
                    <sections-component></sections-component>
                    <pages-component></pages-component>
                </div>
            </div>
            <editor-component></editor-component>
        </div>
    </div>
</template>

<script lang="ts">
    import EditorComponent from './components/Editor.vue'
    import NavigationComponent from './components/Navigation.vue'
    import NotebooksComponent from './components/Notebooks.vue'
    import PagesComponent from './components/Pages.vue'
    import SectionsComponent from './components/Sections.vue'

    export default {
        components: {
            EditorComponent,
            NavigationComponent,
            NotebooksComponent,
            PagesComponent,
            SectionsComponent,
        },
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .notes-main {
        height: 100%;
        margin: 0;
    }

    .notes-main.columns:last-child {
        margin-bottom: 0;
    }

    .notes-navigation {
        height: 100%;
        margin: 0;
    }

    .note-menu {
        border-right: 1px solid #cccccc;
        display: flex;
        flex-direction: column;
        padding-bottom: 0;
        padding-top: 0;
    }

    .note-menu .menu {
        flex: 1;
        overflow: auto;
    }

    .note-command {
        border-top: 1px solid #cccccc;
        cursor: pointer;
        text-align: center;
    }

    .note-title {
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>