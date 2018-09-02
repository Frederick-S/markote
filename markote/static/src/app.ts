import Buefy from 'buefy'
import Vue from 'vue'
import NotesComponent from './components/Notes.vue'
import router from './router'

Vue.use(Buefy, {
    defaultIconPack: 'fas',
})

const vue = new Vue({
    components: {
        NotesComponent,
    },
    el: '#notes',
    router,
    template: '<NotesComponent />',
})
