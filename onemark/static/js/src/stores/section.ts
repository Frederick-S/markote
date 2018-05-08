import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getSections(context, notebook) {
            axios.get(`/api/v1/notebooks/${notebook.id}/sections`).then((response) => {
                context.commit('setSections', response.data.value)
            })
        },
    },
    mutations: {
        setSections(state, sections) {
            state.sections = sections
        },
    },
    state: {
        sections: [],
    },
})
