<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="page in pages" :key="page.id">
                    <a :class="[page.id === selectedPage.id ? 'selected' : '', 'note-title']" @click="getPageMarkdown(page)">{{ page.title }}</a>
                </li>
            </ul>
        </aside>
        <span v-if="isCreatingPage" class="note-command">
            <a class="button is-loading is-creating-page">Loading</a>
        </span>
        <span v-else class="note-command" @click="createPage">Add Page</span>
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
        private isCreatingPage = false

        private isLoading = false

        private selectedPage = new Page()

        private section = new Section()

        get pages(): Page[] {
            return pageStore.state.pages
        }

        private createPage() {
            this.isCreatingPage = true

            pageStore.dispatch('createPage', {
                page: {
                    markdown: '',
                    title: 'Untitled Page',
                },
                section: this.section,
            }).then((page: Page) => {
                this.selectedPage = page
                this.isCreatingPage = false

                event.fire(events.NEW_PAGE, page)
            })
        }

        private getPageMarkdown(page: Page) {
            this.selectedPage = page

            event.fire(events.RENDER_PAGE, page)
        }

        private getPages(section: Section) {
            this.section = section
            this.isLoading = true
            this.selectedPage = new Page()

            pageStore.dispatch('getPages', section).then(() => {
                this.isLoading = false
            })
        }

        private mounted() {
            event.listen(events.GET_PAGES, this.getPages)
            event.listen(events.RESET_PAGES, this.reset)
        }

        private reset(section: Section) {
            this.selectedPage = new Page()
            this.section = section

            pageStore.commit('setPages', [])
        }
    }
</script>

<style>
    .is-creating-page {
        background-color: initial;
        padding: 0;
        border: none;
        height: 1.5rem;
    }
</style>