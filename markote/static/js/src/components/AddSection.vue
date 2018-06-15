<template>
    <div :class="[{ 'is-active': isActive }, 'modal']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Section Name</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Enter a section name:</label>
                    <div class="control">
                        <input class="input" type="text" v-model="name" />
                    </div>
                    <p class="help is-danger">{{ errorMessage }}</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="save">OK</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Model, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'

    @Component
    export default class AddSection extends Vue {
        private isActive = false

        private isInvalidName = false

        private isSaving = false

        private errorMessage = ''

        @Model('name')
        private name

        private close() {
            if (this.isSaving) {
                return
            }

            this.isActive = false
        }

        private mounted() {
            event.listen(events.ADD_SECTION, this.open)
        }

        private open() {
            this.isActive = true
        }

        private save() {
            this.isSaving = true

            this.validateName().then(() => {
            })
        }

        private validateName() {
            return new Promise((resolve, reject) => {
                if (!this.name || !this.name.trim()) {
                    this.isInvalidName = true
                    this.errorMessage = 'Section names can\'t be blank'

                    reject()
                } else {
                    resolve()
                }
            })
        }
    }
</script>