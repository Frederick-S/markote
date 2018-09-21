import db from '../../db'
import GraphClient from '../../graph-client'
import Section from '../../models/section'

export default {
    actions: {
        createSection(context, { notebookId, section }) {
            return new Promise((resolve, reject) => {
                GraphClient.createSection(notebookId, section).then((data: Section) => {
                    context.commit('addSection', data)

                    db.getItem(`notebooks/${notebookId}/sections`).then((sections: Section[]) => {
                        db.setItem(`notebooks/${notebookId}/sections`, [data, ...sections]).finally(() => {
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
        getSections(context, notebookId: string) {
            return new Promise((resolve, reject) => {
                db.getItem(`notebooks/${notebookId}/sections`).then((sections: Section[]) => {
                    context.commit('setSections', sections)

                    resolve(sections)
                }).catch(() => {
                    GraphClient.getSections(notebookId).then((sections: Section[]) => {
                        context.commit('setSections', sections)

                        db.setItem(`notebooks/${notebookId}/sections`, sections).finally(() => {
                            resolve(sections)
                        })
                    }).catch((error) => {
                        reject(error)
                    })
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
    namespaced: true,
    state: {
        sections: [],
    },
}
