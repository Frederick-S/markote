import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import User from '../models/user'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getMe(context) {
            axios.get('/api/v1/me').then((response) => {
                context.commit('setMe', response.data)
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
