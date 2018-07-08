import Vue from 'vue'
import Vuex from 'vuex'
import GraphClient from '../graph-client'
import Notebook from '../models/notebook'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getNotebooks(context) {
            return new Promise((resolve, reject) => {
                GraphClient.getNotebooks().then((data) => {
                    context.commit('setNotebooks', data)

                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
    },
    mutations: {
        setNotebooks(state, notebooks: Notebook[]) {
            state.notebooks = notebooks
        },
    },
    state: {
        notebooks: [],
    },
})
