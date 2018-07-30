import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db'
import GraphClient from '../graph-client'
import Page from '../models/page'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        createPage(context, { sectionId, page }) {
            return new Promise((resolve, reject) => {
                GraphClient.createPage(sectionId, page).then((data: Page) => {
                    context.commit('addPage', data)

                    resolve(data)

                    db.getItem(`sections/${sectionId}/pages`).then((value: Page[]) => {
                        value.push(data)

                        db.setItem(`sections/${sectionId}/pages`, value)
                        db.setItem(`pages/${data.id}`, data)
                    })
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getPages(context, sectionId: string) {
            return new Promise((resolve, reject) => {
                db.getItem(`sections/${sectionId}/pages`).then((data) => {
                    context.commit('setPages', data)

                    resolve()
                }).catch(() => {
                    GraphClient.getPages(sectionId).then((data) => {
                        context.commit('setPages', data)

                        resolve()

                        db.setItem(`sections/${sectionId}/pages`, data)
                    }).catch((error) => {
                        reject(error)
                    })
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
