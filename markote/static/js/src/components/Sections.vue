<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Sections</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="section in sections" :key="section.id">
                    <router-link :class="[section.id === selectedSection.id ? 'selected' : '', 'note-title']" :to="{ name: 'pages', params: { sectionId: section.id } }" @click.native="select(section)">{{ section.displayName }}</router-link>
                </li>
            </ul>
        </aside>
        <span class="note-command" @click="createSection">Add Section</span>
        <b-modal :active.sync="isAddSectionModalActive" has-modal-card>
            <add-section-component v-bind:notebookId="notebookId"></add-section-component>
        </b-modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import bus from '../bus'
    import Section from '../models/section'
    import sectionStore from '../stores/section'
    import toast from '../toast'
    import AddSectionComponent from './AddSection.vue'

    @Component({
        components: {
            AddSectionComponent,
        },
    })
    export default class Sections extends Vue {
        private isAddSectionModalActive = false

        private isLoading = false

        private notebookId = ''

        private selectedSection = new Section()

        get sections(): Section[] {
            return sectionStore.state.sections
        }

        private createSection() {
            if (!this.notebookId) {
                toast.danger('Please select a notebook first')

                return
            }

            this.isAddSectionModalActive = true
        }

        private mounted() {
            bus.$on('newSectionCreated', this.newSectionCreated)
        }

        private newSectionCreated(section: Section) {
            this.selectedSection = section

            sectionStore.commit('addSection', section)

            this.$router.push({
                name: 'pages',
                params: {
                    isNewSection: 'true',
                    sectionId: section.id,
                },
            })
        }

        @Watch('$route')
        private onRouteChanged(to, from) {
            if (to.name !== 'sections') {
                return
            }

            this.isLoading = true
            this.notebookId = to.params.notebookId
            this.selectedSection = new Section()

            sectionStore.dispatch('getSections', this.notebookId).catch((error) => {
                toast.danger('Failed to get sections')

                sectionStore.commit('setSections', [])

                this.$router.push('/error')
            }).finally(() => {
                this.isLoading = false
            })
        }

        private select(section: Section) {
            this.selectedSection = section
        }
    }
</script>