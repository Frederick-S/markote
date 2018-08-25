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
                    const notebookId = this.$route.params.notebookId
                    const sectionId = this.$route.params.sectionId
                    const pageId = this.$route.params.pageId
                    const notebook = notebooks.find((notebook: Notebook) => notebook.id === notebookId)

                    this.select(notebook || notebooks[0])

                    this.$router.push({
                        name: 'sections',
                        params: {
                            notebookId: this.selectedNotebook.id,
                            pageId,
                            sectionId,
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