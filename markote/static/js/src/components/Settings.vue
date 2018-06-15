<template>
    <div :class="[{ 'is-active': isActive }, 'modal']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Settings</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Editor Theme</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select>
                                <option>Chrome</option>
                                <option>Clouds</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Code Theme</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select>
                                <option>Default</option>
                                <option>Agate</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">OK</button>
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
            event.listen(events.OPEN_SETTINGS, this.open)
        }

        private open() {
            this.isActive = true
        }
    }
</script>