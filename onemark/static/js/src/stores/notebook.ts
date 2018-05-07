import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getNotebooks(context) {
            const notebooks = [
                {
                    displayName: 'Notebook',
                },
            ]

            context.commit('setNotebooks', notebooks)
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
