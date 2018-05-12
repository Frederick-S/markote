<template>
    <div class="column is-4 note-menu">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <ul class="menu-list">
                <li v-for="page in pages">
                    <a class="note-title">{{ page.title }}</a>
                </li>
            </ul>
        </aside>
        <span class="note-command" @click="createPage">Add Page</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import pageStore from '../stores/page'
    import event from '../event'
    import events from '../events'

    @Component
    export default class Pages extends Vue {
        private section: any

        get pages() {
            return pageStore.state.pages
        }

        getPages(section: any) {
            this.section = section

            pageStore.dispatch('getPages', section)
        }

        createPage() {
            pageStore.dispatch('createPage', {
                section: this.section,
                page: {
                    title: 'Untitled Page'
                }
            }).then((page) => {
                event.fire(events.NEW_PAGE, page)
            })
        }

        mounted() {
            event.listen(events.GET_PAGES, this.getPages)
        }
    }
</script>