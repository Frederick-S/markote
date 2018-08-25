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
    import bus from '../bus'
    import db from '../db'
    import Page from '../models/page'
    import pageStore from '../stores/page'
    import toast from '../toast'

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
            if (!this.sectionId) {
                toast.danger('Please select a section first')

                return
            }

            this.isCreatingPage = true

            pageStore.dispatch('createPage', {
                page: {
                    markdown: '',
                    title: 'Untitled Page',
                },
                sectionId: this.sectionId,
            }).then((page: Page) => {
                this.selectedPage = page

                this.$router.push({
                    name: 'page',
                    params: {
                        isNewPage: 'true',
                        pageId: page.id,
                        pageTitle: page.title,
                    },
                })
            }).catch((error) => {
                toast.danger('Failed to create page')
            }).finally(() => {
                this.isCreatingPage = false
            })
        }

        private mounted() {
            bus.$on('updatePage', this.updatePage)
        }

        @Watch('$route')
        private onRouteChanged(to, from) {
            switch (to.name) {
                case 'pages':
                    this.sectionId = to.params.sectionId
                    this.selectedPage = new Page()

                    if (!to.params.isNewSection) {
                        this.isLoading = true

                        pageStore.dispatch('getPages', this.sectionId).then((pages: Page[]) => {
                            if (pages.length > 0) {
                                const pageId = this.$route.params.pageId
                                const page = pages.find((page: Page) => page.id === pageId)

                                this.select(page || pages[0])

                                this.$router.push({
                                    name: 'page',
                                    params: {
                                        pageId: this.selectedPage.id,
                                        pageTitle: this.selectedPage.title,
                                    },
                                })
                            }
                        }).catch(() => {
                            toast.danger('Failed to get pages')

                            pageStore.commit('setPages', [])

                            this.$router.push('/error')
                        }).finally(() => {
                            this.isLoading = false
                        })
                    } else {
                        pageStore.commit('setPages', [])
                    }

                    break
                case 'sections':
                    this.reset()

                    break
                default:
                    break
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

        private updatePage(page: Page) {
            pageStore.commit('updatePage', page)

            db.getItem(`sections/${this.sectionId}/pages`).then((pages: Page[]) => {
                const index = pages.findIndex((currentPage: Page) => currentPage.id === page.id)

                if (index > -1) {
                    pages[index].title = page.title

                    db.setItem(`sections/${this.sectionId}/pages`, pages)
                }
            })
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