import Vue from 'vue'
import Vuex from 'vuex'
import Config from '../models/config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: new Config(),
    },
})
