import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Page from '../models/page'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createPage(context, { section, page }) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/v1/sections/${section.id}/pages`, page).then((response) => {
                    if (response.status === 200) {
                        page.id = response.data.id

                        context.commit('addPage', page)

                        resolve(page)
                    } else {
                        reject()
                    }
                }).catch((error) => {
                    reject()
                })
            })
        },
        getPageMarkdown(context, page: Page) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/v1/pages/${page.id}/markdown`).then((response) => {
                    if (response.status === 200) {
                        resolve(response.data)
                    } else {
                        reject()
                    }
                }).catch((error) => {
                    reject()
                })
            })
        },
        getPages(context, section: Section) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/v1/sections/${section.id}/pages`).then((response) => {
                    if (response.status === 200) {
                        context.commit('setPages', response.data.value)

                        resolve()
                    } else {
                        reject()
                    }
                }).catch((error) => {
                    reject()
                })
            })
        },
        updatePage(context, page: Page) {
            axios.patch(`/api/v1/pages/${page.id}/content`, page).then((response) => {
                // pass
            })
        },
    },
    mutations: {
        addPage(state, page: Page) {
            state.pages.push(page)
        },
        setPages(state, pages: Page[]) {
            state.pages = pages
        },
    },
    state: {
        pages: [],
    },
})
