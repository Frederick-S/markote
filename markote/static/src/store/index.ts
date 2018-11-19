import Vue from 'vue'
import Vuex from 'vuex'
import codeTheme from './modules/code-theme'
import config from './modules/config'
import editorTheme from './modules/editor-theme'
import notebook from './modules/notebook'
import page from './modules/page'
import section from './modules/section'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        codeTheme,
        config,
        editorTheme,
        notebook,
        page,
        section,
        user,
    },
})
