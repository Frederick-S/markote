<template>
    <div class="column is-one-fifth">
        <aside class="menu">
            <p class="menu-label">Notebooks</p>
            <ul class="menu-list">
                <li v-for="notebook in notebooks">
                    <a>{{ notebook.displayName }}</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import notebookStore from '../stores/notebook'

    @Component
    export default class Notebooks extends Vue {
        get notebooks() {
            return notebookStore.state.notebooks
        }

        mounted() {
            notebookStore.dispatch('getNotebooks')
        }
    }
</script>