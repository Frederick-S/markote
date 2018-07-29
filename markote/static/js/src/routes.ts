import EditorComponent from './components/Editor.vue'
import NotebooksComponent from './components/Notebooks.vue'
import PagesComponent from './components/Pages.vue'
import SectionsComponent from './components/Sections.vue'

export default [
    {
        component: NotebooksComponent,
        name: 'notebooks',
        path: '/notebooks',
    },
    {
        component: SectionsComponent,
        name: 'sections',
        path: '/notebooks/:notebookId/sections',
    },
    {
        component: PagesComponent,
        name: 'pages',
        path: '/notebooks/:notebookId/sections/:sectionId/pages',
    },
    {
        component: EditorComponent,
        name: 'page',
        path: '/notebooks/:notebookId/sections/:sectionId/pages/:pageId',
    },
]
