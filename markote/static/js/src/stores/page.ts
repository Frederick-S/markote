import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createPage(context, { section, page }) {
            axios.post(`/api/v1/sections/${section.id}/pages`, page).then((response) => {
                console.log(response)
            })
        },
        getPages(context, section) {
            axios.get(`/api/v1/sections/${section.id}/pages`).then((response) => {
                context.commit('setPages', response.data.value)
            })
        },
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages
        },
    },
    state: {
        pages: [],
    },
})
