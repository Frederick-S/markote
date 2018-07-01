import Vue from 'vue'
import Vuex from 'vuex'
import GraphClient from '../graph-client'
import Page from '../models/page'
import Section from '../models/section'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createPage(context, { sectionId, page }) {
            return new Promise((resolve, reject) => {
                GraphClient.createPage(sectionId, page).then((data) => {
                    context.commit('addPage', data)

                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getPages(context, sectionId: string) {
            return new Promise((resolve, reject) => {
                GraphClient.getPages(sectionId).then((data) => {
                    context.commit('setPages', data)

                    resolve()
                }).catch((error) => {
                    reject(error)
                })
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
