import Buefy from 'buefy'
import Vue from 'vue'
import NotesComponent from './components/Notes.vue'
import router from './router'
import store from './store'

Vue.use(Buefy, {
    defaultIconPack: 'fas',
})

const vue = new Vue({
    components: {
        NotesComponent,
    },
    el: '#notes',
    router,
    store,
    template: '<NotesComponent />',
})
