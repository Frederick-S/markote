import db from '../../db'
import Config from '../../models/config'

export default {
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
        invalidateCaches(context) {
            return db.clear()
        },
        updateConfig(context, config) {
            return new Promise((resolve, reject) => {
                db.setItem('config', config).then(() => {
                    context.commit('setConfig', config)

                    resolve(config)
                }).catch((error) => {
                    reject()
                })
            })
        },
    },
    mutations: {
        setConfig(state, config: Config) {
            state.config = config
        },
    },
    namespaced: true,
    state: {
        config: new Config(),
    },
}
