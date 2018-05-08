<template>
    <div class="column is-2 notebooks">
        <aside class="menu">
            <p class="menu-label">Notebooks</p>
            <ul class="menu-list">
                <li v-for="notebook in notebooks">
                    <a @click="getSections(notebook)">{{ notebook.displayName }}</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import notebookStore from '../stores/notebook'
    import event from '../event'
    import events from '../events'

    @Component
    export default class Notebooks extends Vue {
        get notebooks() {
            return notebookStore.state.notebooks
        }

        getSections(notebook: any) {
            event.fire(events.GET_SECTIONS, notebook)
        }

        mounted() {
            notebookStore.dispatch('getNotebooks')
        }
    }
</script>