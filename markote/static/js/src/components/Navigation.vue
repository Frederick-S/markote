<template>
    <nav class="navbar">
        <div class="navbar-end">
            <b-dropdown hoverable position="is-bottom-left">
                <a class="navbar-item" slot="trigger">
                    <span>{{ me.displayName }}</span>
                    <b-icon icon="chevron-down" size="is-small"></b-icon>
                </a>
                <b-dropdown-item @click="openSettings">Settings</b-dropdown-item>
            </b-dropdown>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import User from '../models/user'
    import userStore from '../stores/user'

    @Component
    export default class Navigation extends Vue {
        get me(): User {
            return userStore.state.me
        }

        private mounted() {
            userStore.dispatch('getMe')
        }

        private openSettings() {
            event.fire(events.OPEN_SETTINGS, null)
        }
    }
</script>