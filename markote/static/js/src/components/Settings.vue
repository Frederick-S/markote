<template>
    <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Settings</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Editor Theme">
                    <b-select expanded>
                        <option>Chrome</option>
                        <option>Clouds</option>
                    </b-select>
                </b-field>
                <b-field label="Code Theme">
                    <b-select expanded>
                        <option>Default</option>
                        <option>Agate</option>
                    </b-select>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">OK</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Settings extends Vue {
        private close() {
            const $parent: any = this.$parent

            $parent.close()
        }
    }
</script>