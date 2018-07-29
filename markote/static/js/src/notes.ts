import Buefy from 'buefy'
import Vue from 'vue'
import VueRouter from 'vue-router'
import NotesComponent from './Notes.vue'
import routes from './routes'

Vue.use(Buefy, {
    defaultIconPack: 'fas',
})
Vue.use(VueRouter)

const vue = new Vue({
    components: {
        NotesComponent,
    },
    el: '#notes',
    router: new VueRouter({
        routes,
    }),
    template: '<NotesComponent />',
})
