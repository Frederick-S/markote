import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Notebook from '../models/notebook'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getNotebooks(context) {
            return new Promise((resolve, reject) => {
                axios.get('/api/v1/notebooks').then((response) => {
                    if (response.status === 200) {
                        context.commit('setNotebooks', response.data.value)

                        resolve()
                    } else {
                        reject()
                    }
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
