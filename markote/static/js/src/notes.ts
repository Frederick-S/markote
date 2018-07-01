import Buefy from 'buefy'
import Vue from 'vue'
import NotesComponent from './Notes.vue'

Vue.use(Buefy)

const vue = new Vue({
    components: {
        NotesComponent,
    },
    el: '#notes',
    template: '<NotesComponent />',
})
