<template>
    <div class="column is-4 pages">
        <aside class="menu">
            <p class="menu-label">Pages</p>
            <ul class="menu-list">
                <li v-for="page in pages">
                    <a>{{ page.title }}</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import pageStore from '../stores/page'
    import event from '../event'
    import events from '../events'

    @Component
    export default class Pages extends Vue {
        get pages() {
            return pageStore.state.pages
        }

        getPages(section: any) {
            pageStore.dispatch('getPages', section)
        }

        mounted() {
            event.listen(events.GET_PAGES, this.getPages)
        }
    }
</script>