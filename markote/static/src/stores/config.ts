import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db'
import Config from '../models/config'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        getConfig(context) {
            return new Promise((resolve, reject) => {
                db.getItem('config').then((data) => {
                    context.commit('setConfig', data)

                    resolve(data)
                }).catch(() => {
                    const config = new Config()

                    context.commit('setConfig', config)

                    resolve(config)
                })
            })
        },
    },
    mutations: {
        setConfig(state, config: Config) {
            state.config = config
        },
    },
    state: {
        config: new Config(),
    },
})
