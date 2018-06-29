import axios from './axios'
import Notebook from './models/notebook'
import Page from './models/page'
import Section from './models/section'

export default class GraphClient {
    public static createPage(section: Section, page: Page) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/sections/${section.id}/pages`, page).then((response) => {
                page.id = response.data.id

                resolve(page)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static createSection(notebook: Notebook, section: Section) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/notebooks/${notebook.id}/sections`, section).then((response) => {
                section.id = response.data.id

                resolve(section)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPageMarkdown(page: Page) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/pages/${page.id}/markdown`).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPages(section: Section) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/sections/${section.id}/pages`).then((response) => {
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

    public static getSections(notebook: Notebook, name: string = '') {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/notebooks/${notebook.id}/sections?name=${name}`).then((response) => {
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
