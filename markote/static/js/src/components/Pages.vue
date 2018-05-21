<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <ul class="menu-list">
                <li v-for="page in pages">
                    <a :class="[page.id === selectedPage.id ? 'selected' : '', 'note-title']" @click="getPageContent(page)">{{ page.title }}</a>
                </li>
            </ul>
        </aside>
        <span class="note-command" @click="createPage">Add Page</span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import Page from '../models/page'
    import Section from '../models/section'
    import pageStore from '../stores/page'

    @Component
    export default class Pages extends Vue {
        private selectedPage = new Page()

        private section = new Section()

        get pages(): Page[] {
            return pageStore.state.pages
        }

        private createPage() {
            pageStore.dispatch('createPage', {
                page: {
                    title: 'Untitled Page',
                },
                section: this.section,
            }).then((page: Page) => {
                event.fire(events.NEW_PAGE, page)
            })
        }

        private getPages(section: Section) {
            this.section = section

            pageStore.dispatch('getPages', section)
        }

        private getPageContent(page: Page) {
            this.selectedPage = page
        }

        private mounted() {
            event.listen(events.GET_PAGES, this.getPages)
        }
    }
</script>