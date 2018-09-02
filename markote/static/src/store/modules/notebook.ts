import db from '../../db'
import GraphClient from '../../graph-client'
import Notebook from '../../models/notebook'

export default {
    actions: {
        getNotebooks(context) {
            return new Promise((resolve, reject) => {
                db.getItem('notebooks').then((data) => {
                    context.commit('setNotebooks', data)

                    resolve(data)
                }).catch(() => {
                    GraphClient.getNotebooks().then((data) => {
                        context.commit('setNotebooks', data)

                        resolve(data)

                        db.setItem('notebooks', data)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
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
