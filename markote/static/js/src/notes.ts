import Vue from 'vue'
import NotesComponent from './Notes.vue'

const vue = new Vue({
    components: {
        NotesComponent,
    },
    el: '#notes',
    template: '<NotesComponent />',
})
