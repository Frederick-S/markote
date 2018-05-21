<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Sections</p>
            <ul class="menu-list">
                <li v-for="section in sections">
                    <a class="note-title" @click="getPages(section)">{{ section.displayName }}</a>
                </li>
            </ul>
        </aside>
        <span class="note-command">Add Section</span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import Notebook from '../models/notebook'
    import Section from '../models/section'
    import sectionStore from '../stores/section'

    @Component
    export default class Sections extends Vue {
        get sections(): Section[] {
            return sectionStore.state.sections
        }

        private getPages(section: Section) {
            event.fire(events.GET_PAGES, section)
        }

        private getSections(notebook: Notebook) {
            sectionStore.dispatch('getSections', notebook)
        }

        private mounted() {
            event.listen(events.GET_SECTIONS, this.getSections)
        }
    }
</script>