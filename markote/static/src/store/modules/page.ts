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
                    const index = context.state.pages.findIndex((value) => value.id === pageId)

                    if (index < 0) {
                        reject()

                        return
                    }

                    const page = new Page()
                    page.id = pageId
                    page.title = context.state.pages[index].title

                    GraphClient.getPageMarkdown(pageId).then((markdown: string) => {
                        page.markdown = markdown

                        db.setItem(`pages/${pageId}`, page)

                        resolve(page)
                    }).catch(() => {
                        GraphClient.getPageContent(pageId).then((content: string) => {
                            page.content = content
                            page.markdown = ''
                            page.isReadOnly = true

                            db.setItem(`pages/${pageId}`, page)

                            resolve(page)
                        }).catch(() => {
                            reject()
                        })
                    })
                })
            })
        },
        getPageMarkdown(context, page: Page) {
            return new Promise((resolve, reject) => {
                db.getItem(`pages/${page.id}`).then((data: Page) => {
                    resolve(data.markdown)
                }).catch(() => {
                    GraphClient.getPageMarkdown(page.id).then((markdown: string) => {
                        resolve(markdown)

                        page.markdown = markdown

                        db.setItem(`pages/${page.id}`, page)
                    }).catch(() => {
                        reject()
                    })
                })
            })
        },
        getPageContent(context, page: Page) {
            return new Promise((resolve, reject) => {
                db.getItem(`pages/${page.id}`).then((data: Page) => {
                    resolve(data.content)
                }).catch(() => {
                    GraphClient.getPageContent(page.id).then((content: string) => {
                        resolve(content)

                        page.content = content

                        db.setItem(`pages/${page.id}`, page)
                    }).catch(() => {
                        reject()
                    })
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
        updatePageContent(context, page: Page) {
            return new Promise((resolve, reject) => {
                GraphClient.updatePageContent(page).then(() => {
                    db.setItem(`pages/${page.id}`, page)

                    resolve()
                }).catch((error) => {
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
