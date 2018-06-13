import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Notebook from '../models/notebook'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createSection(context, { notebook, section }) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/v1/notebooks/${notebook.id}/sections`, section).then((response) => {
                    if (response.status === 201) {
                        section.id = response.data.id

                        context.commit('addSection', section)

                        resolve(section)
                    } else {
                        reject()
                    }
                }).catch((error) => {
                    reject()
                })
            })
        },
        getSections(context, notebook: Notebook) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/v1/notebooks/${notebook.id}/sections`).then((response) => {
                    if (response.status === 200) {
                        context.commit('setSections', response.data.value)

                        resolve()
                    } else {
                        reject()
                    }
                }).catch((error) => {
                    reject()
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
