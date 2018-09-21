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
    import { Action, Getter, State } from 'vuex-class'
    import Notebook from '../models/notebook'
    import toast from '../toast'

    @Component
    export default class Notebooks extends Vue {
        private isLoading = true

        private selectedNotebook: Notebook = new Notebook()

        @Getter('notebook/getNotebookById') getNotebookById

        @State(state => state.notebook.notebooks) notebooks: Notebook[]

        @Action('notebook/getNotebooks') getNotebooks

        private mounted() {
            this.getNotebooks().then((notebooks: Notebook[]) => {
                const { notebookId, sectionId, pageId } = this.$route.params
                const notebook = this.getNotebookById(notebookId) || notebooks[0] || new Notebook()

                this.select(notebook)

                if (this.selectedNotebook.id) {
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