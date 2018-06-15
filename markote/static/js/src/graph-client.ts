import axios from 'axios'
import Notebook from './models/notebook'
import Page from './models/page'
import Section from './models/section'

export default class GraphClient {
    public static createPage(section: Section, page: Page) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/sections/${section.id}/pages`, page).then((response) => {
                if (response.status === 201) {
                    page.id = response.data.id

                    resolve(page)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static createSection(notebook: Notebook, section: Section) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/v1/notebooks/${notebook.id}/sections`, section).then((response) => {
                if (response.status === 201) {
                    section.id = response.data.id

                    resolve(section)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPageMarkdown(page: Page) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/pages/${page.id}/markdown`).then((response) => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getPages(section: Section) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/sections/${section.id}/pages`).then((response) => {
                if (response.status === 200) {
                    resolve(response.data.value)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getNotebooks() {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/notebooks').then((response) => {
                if (response.status === 200) {
                    resolve(response.data.value)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getMe() {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/me').then((response) => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static getSections(notebook: Notebook) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/v1/notebooks/${notebook.id}/sections`).then((response) => {
                if (response.status === 200) {
                    resolve(response.data.value)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static updatePageContent(page: Page) {
        return new Promise((resolve, reject) => {
            axios.patch(`/api/v1/pages/${page.id}/content`, page).then((response) => {
                if (response.status === 204) {
                    resolve()
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
}
