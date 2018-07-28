import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db'
import GraphClient from '../graph-client'
import Notebook from '../models/notebook'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createSection(context, { notebookId, section }) {
            return new Promise((resolve, reject) => {
                GraphClient.createSection(notebookId, section).then((data: Notebook) => {
                    context.commit('addSection', data)

                    resolve(data)

                    db.getItem(`notebooks/${notebookId}/sections`).then((value: Section[]) => {
                        value.push(data)

                        db.setItem(`notebooks/${notebookId}/sections`, value)
                    })
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getSections(context, notebookId: string) {
            return new Promise((resolve, reject) => {
                db.getItem(`notebooks/${notebookId}/sections`).then((data) => {
                    context.commit('setSections', data)

                    resolve(data)
                }).catch(() => {
                    GraphClient.getSections(notebookId).then((data) => {
                        context.commit('setSections', data)

                        resolve(data)

                        db.setItem(`notebooks/${notebookId}/sections`, data)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
    },
    mutations: {
        addSection(state, section: Section) {
            state.sections.push(section)
        },
        setSections(state, sections: Section[]) {
            state.sections = sections
        },
    },
    state: {
        sections: [],
    },
})
