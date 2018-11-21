<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <div v-if="isLoading" class="spinner button is-loading"></div>
            <ul v-else class="menu-list">
                <li v-for="page in pages" :key="page.id">
                    <router-link :class="[page.id === selectedPage.id ? 'selected' : '', 'note-title']" :to="{ name: 'page', params: { pageId: page.id } }" @click.native="select(page)">{{ page.title }}</router-link>
                </li>
            </ul>
        </aside>
        <span v-if="isCreatingPage" class="note-command">
            <a class="button is-loading is-creating-page">Loading</a>
        </span>
        <span v-else class="note-command" @click="addPage">Add Page</span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { Action, Getter, Mutation, State } from 'vuex-class'
    import bus from '../bus'
    import Page from '../models/page'
    import toast from '../toast'

    @Component
    export default class Pages extends Vue {
        private isCreatingPage = false

        private isLoading = false

        private selectedPage = new Page()

        private sectionId = ''

        @Getter('page/getPageById') getPageById

        @State(state => state.page.pages) pages: Page[]

        @Action('page/createPage') createPage

        @Action('page/getPages') getPages

        @Action('page/updatePage') updatePage

        @Mutation('page/setPages') setPages

        private addPage() {
            if (!this.sectionId) {
                toast.danger('Please select a section first')

                return
            }

            this.isCreatingPage = true

            this.createPage({
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
                        pageId: page.id,
                    },
                })
            }).catch((error) => {
                toast.danger('Failed to create page')
            }).finally(() => {
                this.isCreatingPage = false
            })
        }

        private mounted() {
            bus.$on('updatePage', this.onUpdatePage)
        }

        @Watch('$route')
        private onRouteChanged(to, from) {
            switch (to.name) {
                case 'pages':
                    this.sectionId = to.params.sectionId
                    this.selectedPage = new Page()

                    this.isLoading = true

                    this.getPages(this.sectionId).then((pages: Page[]) => {
                        if (pages.length > 0) {
                            const { pageId } = this.$route.params
                            const page = this.getPageById(pageId) || pages[0] || new Page()

                            this.select(page)

                            if (this.selectedPage.id) {
                                this.$router.push({
                                    name: 'page',
                                    params: {
                                        pageId: this.selectedPage.id,
                                    },
                                })
                            }
                        }
                    }).catch(() => {
                        toast.danger('Failed to get pages')

                        this.setPages([])

                        this.$router.push('/error')
                    }).finally(() => {
                        this.isLoading = false
                    })

                    break
                case 'sections':
                    this.init()

                    break
                default:
                    break
            }
        }

        private init() {
            this.selectedPage = new Page()
            this.sectionId = ''

            this.setPages([])
        }

        private select(page: Page) {
            this.selectedPage = page
        }

        private onUpdatePage(page: Page) {
            this.updatePage({
                sectionId: this.sectionId,
                page,
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