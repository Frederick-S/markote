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
        <b-modal :active.sync="isSettingsModalActive" has-modal-card>
            <settings-component></settings-component>
        </b-modal>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import User from '../models/user'
    import userStore from '../stores/user'
    import SettingsComponent from './Settings.vue'

    @Component({
        components: {
            SettingsComponent,
        },
    })
    export default class Navigation extends Vue {
        private isSettingsModalActive = false

        get me(): User {
            return userStore.state.me
        }

        private mounted() {
            userStore.dispatch('getMe')
        }

        private openSettings() {
            this.isSettingsModalActive = true
        }
    }
</script>