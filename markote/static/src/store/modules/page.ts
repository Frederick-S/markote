import db from '../../db'
import GraphClient from '../../graph-client'
import Page from '../../models/page'

export default {
    actions: {
        createPage(context, { sectionId, page }) {
            return new Promise((resolve, reject) => {
                GraphClient.createPage(sectionId, page).then((data: Page) => {
                    context.commit('addPage', data)

                    db.getItem(`sections/${sectionId}/pages`).then((pages: Page[]) => {
                        Promise.all([
                            db.setItem(`sections/${sectionId}/pages`, [data, ...pages]),
                            db.setItem(`pages/${data.id}`, data)]).then(() => {
                            resolve(data)
                        })
                    }).catch(() => {
                        resolve(data)
                    })
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getPage(context, pageId: string) {
            return new Promise((resolve, reject) => {
                db.getItem(`pages/${pageId}`).then((page: Page) => {
                    resolve(page)
                }).catch(() => {
                    const page = context.state.pages.find((value) => value.id === pageId)

                    if (!page) {
                        reject()

                        return
                    }

                    GraphClient.getPageMarkdown(pageId).then((markdown: string) => {
                        const pageWithContent = {...page, ...{ markdown }}

                        db.setItem(`pages/${pageId}`, pageWithContent).finally(() => {
                            resolve(pageWithContent)
                        })
                    }).catch(() => {
                        GraphClient.getPageContent(pageId).then((content: string) => {
                            const pageWithContent = {...page, ...{ content, markdown: '', isReadOnly: true }}

                            db.setItem(`pages/${pageId}`, pageWithContent)
                                .finally(() => {
                                    resolve(pageWithContent)
                                })
                        }).catch(() => {
                            reject()
                        })
                    })
                })
            })
        },
        getPages(context, sectionId: string) {
            return new Promise((resolve, reject) => {
                db.getItem(`sections/${sectionId}/pages`).then((pages: Page[]) => {
                    context.commit('setPages', pages)

                    resolve(pages)
                }).catch(() => {
                    GraphClient.getPages(sectionId).then((pages: Page[]) => {
                        context.commit('setPages', pages)

                        db.setItem(`sections/${sectionId}/pages`, pages).finally(() => {
                            resolve(pages)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
        setPages(context, { sectionId, pages }) {
            return new Promise((resolve, reject) => {
                db.setItem(`sections/${sectionId}/pages`, pages).finally(() => {
                    context.commit('setPages', pages)

                    resolve()
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
        updatePageContent(context, page: Page) {
            return new Promise((resolve, reject) => {
                GraphClient.updatePageContent(page).then(() => {
                    db.setItem(`pages/${page.id}`, page).finally(() => {
                        resolve()
                    })
                }).catch((error) => {
                    reject()
                })
            })
        },
    },
    getters: {
        getPageById: (state) => (id: string) => {
            return state.pages.find((page) => page.id === id)
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
