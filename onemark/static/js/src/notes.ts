import Vue from 'vue'
import NavigationComponent from './components/navigation.vue'
import NotebooksComponent from './components/notebooks.vue'
import SectionsComponent from './components/sections.vue'

const vue = new Vue({
    components: {
        NavigationComponent,
        NotebooksComponent,
        SectionsComponent,
    },
    el: '#notes',
    template: `
        <div>
            <navigation-component></navigation-component>
            <div class="main columns">
                <notebooks-component></notebooks-component>
                <sections-component></sections-component>
            </div>
        </div>`,
})
