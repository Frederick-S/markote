import db from '../../db'
import GraphClient from '../../graph-client'
import User from '../../models/user'

export default {
    actions: {
        getMe(context) {
            return new Promise((resolve, reject) => {
                db.getItem('me').then((data) => {
                    context.commit('setMe', data)

                    resolve(data)
                }).catch(() => {
                    GraphClient.getMe().then((data) => {
                        context.commit('setMe', data)

                        resolve(data)

                        db.setItem('me', data)
                    }).catch((error) => {
                        reject(error)
                    })
                })
            })
        },
    },
    mutations: {
        setMe(state, me: User) {
            state.me = me
        },
    },
    namespaced: true,
    state: {
        me: new User(),
    },
}
