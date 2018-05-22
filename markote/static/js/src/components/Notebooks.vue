<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Notebooks</p>
            <ul class="menu-list">
                <li v-for="notebook in notebooks">
                    <a :class="[notebook.id === selectedNotebook.id ? 'selected' : '', 'note-title']" @click="getSections(notebook)">{{ notebook.displayName }}</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import Notebook from '../models/notebook'
    import notebookStore from '../stores/notebook'

    @Component
    export default class Notebooks extends Vue {
        private selectedNotebook = new Notebook()

        get notebooks(): Notebook[] {
            return notebookStore.state.notebooks
        }

        private getSections(notebook: Notebook) {
            this.selectedNotebook = notebook

            event.fire(events.GET_SECTIONS, notebook)
            event.fire(events.RESET_EDITOR, null)
            event.fire(events.RESET_PAGES, null)
        }

        private mounted() {
            notebookStore.dispatch('getNotebooks')
        }
    }
</script>