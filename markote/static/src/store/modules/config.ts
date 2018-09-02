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
