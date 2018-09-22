import db from '../../db'
import GraphClient from '../../graph-client'
import User from '../../models/user'

export default {
    actions: {
        getMe(context) {
            return new Promise((resolve, reject) => {
                db.getItem('me').then((me: User) => {
                    context.commit('setMe', me)

                    resolve(me)
                }).catch(() => {
                    GraphClient.getMe().then((me: User) => {
                        context.commit('setMe', me)

                        db.setItem('me', me).finally(() => {
                            resolve(me)
                        })
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
