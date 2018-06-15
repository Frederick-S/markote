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
                    <p v-if="isError" class="help is-danger">{{ errorMessage }}</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button :class="[{ 'is-loading': isSaving }, 'button', 'is-success']" @click="save">OK</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Model, Vue } from 'vue-property-decorator'
    import event from '../event'
    import events from '../events'
    import GraphClient from '../graph-client'
    import Notebook from '../models/notebook'
    import Section from '../models/section'

    @Component
    export default class AddSection extends Vue {
        private isActive = false

        private isError = false

        private isSaving = false

        private errorMessage = ''

        private name = ''

        private notebook = new Notebook()

        private close() {
            if (this.isSaving) {
                return
            }

            this.isActive = false
            this.isError = false
            this.errorMessage = ''
            this.name = ''
        }

        private mounted() {
            event.listen(events.ADD_SECTION, this.open)
        }

        private open(notebook: Notebook) {
            this.isActive = true
            this.notebook = notebook
        }

        private save() {
            this.isSaving = true
            this.isError = false

            this.validateName().then(() => {
                this.isError = false

                GraphClient.createSection(this.notebook, new Section(this.name)).then((data) => {
                    event.fire(events.NEW_SECTION, data)

                    this.isSaving = false

                    this.close()
                }).catch((error) => {
                    this.isSaving = false
                    this.isError = true
                    this.errorMessage = 'Failed to create section'
                })
            }).catch((errorMessage) => {
                this.isSaving = false
                this.isError = true
                this.errorMessage = errorMessage
            })
        }

        private validateName() {
            return new Promise((resolve, reject) => {
                if (!this.name || !this.name.trim()) {
                    reject('Section names can\'t be blank')
                } else {
                    GraphClient.getSections(this.notebook, this.name).then((data: Section[]) => {
                        if (data.length > 0) {
                            reject('This notebook already has a section with that name')
                        } else {
                            resolve()
                        }
                    }).catch((error) => {
                        reject('Something is wrong')
                    })
                }
            })
        }
    }
</script>