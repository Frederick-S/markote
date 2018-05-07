import Vue from 'vue'
import NavigationComponent from './components/navigation.vue'
import NotebooksComponent from './components/notebooks.vue'

const vue = new Vue({
    components: {
        NavigationComponent,
        NotebooksComponent,
    },
    el: '#notes',
    template: `
        <div>
            <navigation-component></navigation-component>
            <div class="main columns">
                <notebooks-component></notebooks-component>
            </div>
        </div>`,
})
