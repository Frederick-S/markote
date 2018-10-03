import axios from './axios'
import Page from './models/page'
import Section from './models/section'

export default class GraphClient {
    public static createPage(sectionId: string, page: Page) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/sections/${sectionId}/pages`, page).then((response) => {
                resolve({...page, ...{ id: response.data.id }})
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static createSection(notebookId: string, section: Section) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/notebooks/${notebookId}/sections`, section).then((response) => {
                resolve({...section, ...{ id: response.data.id }})
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPageMarkdown(pageId: string) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/pages/${pageId}/markdown`).then((response) => {
                resolve(response.data ? response.data.toString() : '')
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPageContent(pageId: string) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/pages/${pageId}/content`).then((response) => {
                resolve(response.data ? response.data.toString() : '')
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPages(sectionId: string) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/sections/${sectionId}/pages`).then((response) => {
                resolve(response.data.value)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getNotebooks() {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/notebooks').then((response) => {
                resolve(response.data.value)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getMe() {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/me').then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getSections(notebookId: string, name: string = '') {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/notebooks/${notebookId}/sections?name=${name}`).then((response) => {
                resolve(response.data.value)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static updatePageContent(page: Page) {
        return new Promise((resolve, reject) => {
            axios.patch(`/api/v1/pages/${page.id}/content`, page).then((response) => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        })
    }
}
