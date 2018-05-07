<template>
    <div class="column is-one-fifth">
        <aside class="menu">
            <ul class="menu-list">
                <li v-for="notebook in notebooks">
                    <a>{{ notebook.displayName }}</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    @Component
    export default class Notebooks extends Vue {
        data() {
            return {
                notebooks: []
            }
        }
    }
</script>