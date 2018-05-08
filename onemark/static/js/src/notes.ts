import Vue from 'vue'
import EditorComponent from './components/editor.vue'
import NavigationComponent from './components/navigation.vue'
import NotebooksComponent from './components/notebooks.vue'
import PagesComponent from './components/pages.vue'
import SectionsComponent from './components/sections.vue'

const vue = new Vue({
    components: {
        EditorComponent,
        NavigationComponent,
        NotebooksComponent,
        PagesComponent,
        SectionsComponent,
    },
    el: '#notes',
    template: `
        <div>
            <navigation-component></navigation-component>
            <div class="columns">
                <div class="column is-5">
                    <div class="notes-navigation columns">
                        <notebooks-component></notebooks-component>
                        <sections-component></sections-component>
                        <pages-component></pages-component>
                    </div>
                </div>
                <div class="column">
                    <editor-component></editor-component>
                </div>
            </div>
        </div>`,
})
