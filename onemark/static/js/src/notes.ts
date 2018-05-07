import Vue from 'vue'
import NotebooksComponent from './components/Notebooks.vue'

const vue = new Vue({
    components: {
        NotebooksComponent,
    },
    el: '#notes',
    template: `
        <notebooks-component></notebooks-component>
    `,
})
