<template>
    <nav class="navbar">
        <div class="navbar-end">
            <b-dropdown hoverable position="is-bottom-left">
                <a class="navbar-item" slot="trigger">
                    <span>{{ me.displayName }}</span>
                    <b-icon icon="caret-down" size="is-small"></b-icon>
                </a>
                <b-dropdown-item @click="openSettings">Settings</b-dropdown-item>
                <b-dropdown-item @click="invalidateCachesAndReload">Invalidate Caches & Reload</b-dropdown-item>
            </b-dropdown>
        </div>
        <b-modal :active.sync="isSettingsModalActive" has-modal-card :can-cancel="false">
            <settings-component></settings-component>
        </b-modal>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { Action, State } from 'vuex-class'
    import User from '../models/user'
    import toast from '../toast'
    import SettingsComponent from './Settings.vue'

    @Component({
        components: {
            SettingsComponent,
        },
    })
    export default class Navigation extends Vue {
        private isSettingsModalActive = false

        @State(state => state.user.me) me: User

        @Action('user/getMe') getMe

        @Action('config/invalidateCaches') invalidateCaches

        private invalidateCachesAndReload() {
            this.invalidateCaches().then(() => {
                window.location.href = '/'
            }).catch(() => {
                toast.danger('Failed to invalidate caches')
            })
        }

        private mounted() {
            this.getMe()
        }

        private openSettings() {
            this.isSettingsModalActive = true
        }
    }
</script>