import db from '../../db'
import GraphClient from '../../graph-client'
import Notebook from '../../models/notebook'

export default {
    actions: {
        getNotebooks(context) {
            return new Promise((resolve, reject) => {
                db.getItem('notebooks').then((notebooks: Notebook[]) => {
                    context.commit('setNotebooks', notebooks)

                    resolve(notebooks)
                }).catch(() => {
                    GraphClient.getNotebooks().then((notebooks: Notebook[]) => {
                        context.commit('setNotebooks', notebooks)

                        db.setItem('notebooks', notebooks).finally(() => {
                            resolve(notebooks)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
    },
    getters: {
        getNotebookById: (state) => (id: string) => {
            return state.notebooks.find((notebook) => notebook.id === id)
        },
    },
    mutations: {
        setNotebooks(state, notebooks: Notebook[]) {
            state.notebooks = notebooks
        },
    },
    namespaced: true,
    state: {
        notebooks: [],
    },
}
