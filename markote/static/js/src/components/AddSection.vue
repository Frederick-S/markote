<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Section Name</p>
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
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import bus from '../bus'
    import GraphClient from '../graph-client'
    import Section from '../models/section'

    @Component
    export default class AddSection extends Vue {
        private isError = false

        private isSaving = false

        private errorMessage = ''

        private name = ''

        @Prop()
        private notebookId: string

        private close() {
            if (this.isSaving) {
                return
            }

            this.isError = false
            this.errorMessage = ''
            this.name = ''

            const $parent: any = this.$parent

            $parent.close()
        }

        private save() {
            this.isSaving = true
            this.isError = false

            this.validateName().then(() => {
                this.isError = false

                GraphClient.createSection(this.notebookId, new Section(this.name)).then((data) => {
                    bus.$emit('newSectionCreated', data)

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
                    GraphClient.getSections(this.notebookId, this.name).then((data: Section[]) => {
                        if (data.length > 0) {
                            reject('This notebook already has a section with that name')
                        } else {
                            resolve()
                        }
                    }).catch((error) => {
                        reject('Failed to get sections')
                    })
                }
            })
        }
    }
</script>