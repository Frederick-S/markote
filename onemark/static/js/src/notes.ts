import Vue from "vue";
import NotebooksComponent from "./components/notebooks";

const vue = new Vue({
    components: {
        NotebooksComponent,
    },
    el: "#notes",
    template: `
        <notebooks-component></notebooks-component>
    `,
});
