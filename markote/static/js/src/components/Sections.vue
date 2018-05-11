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
    import { Vue, Component } from 'vue-property-decorator'
    import sectionStore from '../stores/section'
    import event from '../event'
    import events from '../events'

    @Component
    export default class Sections extends Vue {
        get sections() {
            return sectionStore.state.sections
        }

        getSections(notebook: any) {
            sectionStore.dispatch('getSections', notebook)
        }

        getPages(section: any) {
            event.fire(events.GET_PAGES, section)
        }

        mounted() {
            event.listen(events.GET_SECTIONS, this.getSections)
        }
    }
</script>