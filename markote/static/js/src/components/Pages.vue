<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="page in pages">
                    <a :class="[page.id === selectedPage.id ? 'selected' : '', 'note-title']" @click="getPageMarkdown(page)">{{ page.title }}</a>
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
        private isLoading = false

        private selectedPage = new Page()

        private section = new Section()

        get pages(): Page[] {
            return pageStore.state.pages
        }

        private createPage() {
            pageStore.dispatch('createPage', {
                page: {
                    markdown: '',
                    title: 'Untitled Page',
                },
                section: this.section,
            }).then((page: Page) => {
                event.fire(events.RENDER_PAGE, page)
            })
        }

        private getPages(section: Section) {
            this.section = section
            this.isLoading = true
            this.selectedPage = new Page()

            pageStore.dispatch('getPages', section).then(() => {
                this.isLoading = false
            })
        }

        private getPageMarkdown(page: Page) {
            this.selectedPage = page

            pageStore.dispatch('getPageMarkdown', page).then((markdown: string) => {
                event.fire(events.RENDER_PAGE, {
                    id: this.selectedPage.id,
                    markdown,
                    title: this.selectedPage.title,
                })
            })
        }

        private mounted() {
            event.listen(events.GET_PAGES, this.getPages)
            event.listen(events.RESET_PAGES, this.reset)
        }

        private reset() {
            this.selectedPage = new Page()

            pageStore.commit('setPages', [])
        }
    }
</script>