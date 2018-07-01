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
            this.isAddSectionModalActive = true
        }

        private mounted() {
            bus.$on('newSection', this.newSection)
        }

        private newSection(section: Section) {
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
            if (to.name === 'sections') {
                this.isLoading = true
                this.notebookId = to.params.notebookId
                this.selectedSection = new Section()

                sectionStore.dispatch('getSections', this.notebookId).then(() => {
                    this.isLoading = false
                })
            }
        }

        private select(section: Section) {
            this.selectedSection = section
        }
    }
</script>

<style>
    .is-creating-section {
        background-color: initial;
        padding: 0;
        border: none;
        height: 1.5rem;
    }
</style>