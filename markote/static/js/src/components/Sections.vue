<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Sections</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="section in sections">
                    <a :class="[section.id === selectedSection.id ? 'selected' : '', 'note-title']" @click="getPages(section)">{{ section.displayName }}</a>
                </li>
            </ul>
        </aside>
        <span class="note-command" @click="createSection">Add Section</span>
        <add-section-component></add-section-component>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import Notebook from '../models/notebook'
    import Section from '../models/section'
    import sectionStore from '../stores/section'
    import AddSectionComponent from './AddSection.vue'

    @Component({
        components: {
            AddSectionComponent,
        },
    })
    export default class Sections extends Vue {
        private isLoading = false

        private notebook = new Notebook()

        private selectedSection = new Section()

        get sections(): Section[] {
            return sectionStore.state.sections
        }

        private createSection() {
            event.fire(events.ADD_SECTION, null)
        }

        private getPages(section: Section) {
            this.selectedSection = section

            event.fire(events.GET_PAGES, section)
            event.fire(events.RESET_EDITOR, null)
        }

        private getSections(notebook: Notebook) {
            this.isLoading = true
            this.notebook = notebook
            this.selectedSection = new Section()

            sectionStore.dispatch('getSections', notebook).then(() => {
                this.isLoading = false
            })
        }

        private mounted() {
            event.listen(events.GET_SECTIONS, this.getSections)
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