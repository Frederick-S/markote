import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config'
import notebook from './modules/notebook'
import page from './modules/page'
import section from './modules/section'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        config,
        notebook,
        page,
        section,
        user,
    },
})
