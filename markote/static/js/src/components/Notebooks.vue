<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Notebooks</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="notebook in notebooks" :key="notebook.id">
                    <router-link :class="[notebook.id === selectedNotebook.id ? 'selected' : '', 'note-title']" :to="{ name: 'sections', params: { notebookId: notebook.id } }" @click.native="select(notebook)">{{ notebook.displayName }}</router-link>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Notebook from '../models/notebook'
    import notebookStore from '../stores/notebook'
    import toast from '../toast'

    @Component
    export default class Notebooks extends Vue {
        private isLoading = true

        private selectedNotebook = new Notebook()

        get notebooks(): Notebook[] {
            return notebookStore.state.notebooks
        }

        private mounted() {
            notebookStore.dispatch('getNotebooks').then((notebooks: Notebook[]) => {
                if (notebooks.length > 0) {
                    this.select(notebooks[0])

                    this.$router.push({
                        name: 'sections',
                        params: {
                            notebookId: notebooks[0].id,
                        },
                    })
                }
            }).catch((error) => {
                toast.danger('Failed to get notebooks')
            }).finally(() => {
                this.isLoading = false
            })
        }

        private select(notebook: Notebook) {
            this.selectedNotebook = notebook
        }
    }
</script>