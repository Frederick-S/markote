import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getNotebooks(context) {
            axios.get('/api/v1/notebooks').then((response) => {
                context.commit('setNotebooks', response.data.value)
            })
        },
    },
    mutations: {
        setNotebooks(state, notebooks) {
            state.notebooks = notebooks
        },
    },
    state: {
        notebooks: [],
    },
})
