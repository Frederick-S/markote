import Vue from 'vue'
import db from '../../db'
import GraphClient from '../../graph-client'
import Page from '../../models/page'

export default {
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

                    resolve(data)
                }).catch(() => {
                    GraphClient.getPages(sectionId).then((data) => {
                        context.commit('setPages', data)

                        resolve(data)

                        db.setItem(`sections/${sectionId}/pages`, data)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        updatePage(context, { sectionId, page }) {
            return new Promise((resolve, reject) => {
                context.commit('updatePage', page)

                db.setItem(`sections/${sectionId}/pages`, context.state.pages).then(() => {
                    resolve()
                }).catch(() => {
                    reject()
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
        updatePage(state, page: Page) {
            const index = state.pages.findIndex((currentPage: Page) => currentPage.id === page.id)

            if (index > -1) {
                state.pages[index].title = page.title
            }
        },
    },
    namespaced: true,
    state: {
        pages: [],
    },
}
