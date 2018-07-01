<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="page in pages" :key="page.id">
                    <router-link :class="[page.id === selectedPage.id ? 'selected' : '', 'note-title']" :to="{ name: 'page', params: { pageId: page.id, pageTitle: page.title } }" @click.native="select(page)">{{ page.title }}</router-link>
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
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import Page from '../models/page'
    import pageStore from '../stores/page'

    @Component
    export default class Pages extends Vue {
        private isCreatingPage = false

        private isLoading = false

        private selectedPage = new Page()

        private sectionId = ''

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
                sectionId: this.sectionId,
            }).then((page: Page) => {
                this.selectedPage = page
                this.isCreatingPage = false

                this.$router.push({
                    name: 'page',
                    params: {
                        isNewPage: 'true',
                        pageId: page.id,
                        pageTitle: page.title,
                    },
                })
            })
        }

        @Watch('$route')
        private onRouteChanged(to, from) {
            if (to.name === 'pages') {
                this.sectionId = to.params.sectionId
                this.selectedPage = new Page()

                if (!to.params.isNewSection) {
                    this.isLoading = true

                    pageStore.dispatch('getPages', this.sectionId).then(() => {
                        this.isLoading = false
                    })
                } else {
                    pageStore.commit('setPages', [])
                }
            } else if (to.name === 'sections') {
                this.reset()
            }
        }

        private reset() {
            this.selectedPage = new Page()
            this.sectionId = ''

            pageStore.commit('setPages', [])
        }

        private select(page: Page) {
            this.selectedPage = page
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