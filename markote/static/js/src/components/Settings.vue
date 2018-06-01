<template>
    <div :class="[{ 'is-active': isActive }, 'modal']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Settings</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <h1>Hello</h1>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'

    @Component
    export default class Settings extends Vue {
        private isActive = false

        private close() {
            this.isActive = false
        }

        private mounted() {
            event.listen(events.OPEN_SETTINGS, this.openSettings)
        }

        private openSettings() {
            this.isActive = true
        }
    }
</script>