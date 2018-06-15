import Vue from 'vue'
import Vuex from 'vuex'
import GraphClient from '../graph-client'
import User from '../models/user'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getMe(context) {
            return new Promise((resolve, reject) => {
                GraphClient.getMe().then((data) => {
                    context.commit('setMe', data)

                    resolve()
                }).catch((error) => {
                    reject(error)
                })
            })
        },
    },
    mutations: {
        setMe(state, me: User) {
            state.me = me
        },
    },
    state: {
        me: new User(),
    },
})
