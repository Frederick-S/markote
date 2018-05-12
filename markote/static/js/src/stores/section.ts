import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Notebook from '../models/notebook'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getSections(context, notebook: Notebook) {
            axios.get(`/api/v1/notebooks/${notebook.id}/sections`).then((response) => {
                context.commit('setSections', response.data.value)
            })
        },
    },
    mutations: {
        setSections(state, sections: Section[]) {
            state.sections = sections
        },
    },
    state: {
        sections: [],
    },
})
