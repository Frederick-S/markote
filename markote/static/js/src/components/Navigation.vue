<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-end">
            <div class="navbar-item dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="settings">
                        <span>{{ me.displayName }}</span>
                        <b-icon icon="chevron-down" size="is-small"></b-icon>
                    </button>
                </div>
                <div class="dropdown-menu" id="settings" role="menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item" @click="openSettings">Settings</a>
                    </div>
                </div>
            </div>
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