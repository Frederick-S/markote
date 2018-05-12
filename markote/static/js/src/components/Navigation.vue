<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-end">
            <a class="navbar-item">{{ me.displayName }}</a>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import User from '../models/user'
    import userStore from '../stores/user'

    @Component
    export default class Navigation extends Vue {
        get me(): User {
            return userStore.state.me
        }

        mounted() {
            userStore.dispatch('getMe')
        }
    }
</script>