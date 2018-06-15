import Vue from 'vue'
import Vuex from 'vuex'
import GraphClient from '../graph-client'
import Notebook from '../models/notebook'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createSection(context, { notebook, section }) {
            return new Promise((resolve, reject) => {
                GraphClient.createSection(notebook, section).then((data) => {
                    context.commit('addSection', data)

                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getSections(context, notebook: Notebook) {
            return new Promise((resolve, reject) => {
                GraphClient.getSections(notebook).then((data) => {
                    context.commit('setSections', data)

                    resolve()
                }).catch((error) => {
                    reject(error)
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
