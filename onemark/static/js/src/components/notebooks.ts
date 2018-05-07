import Vue from "vue";

export default Vue.extend({
    template: `
        <div class="column is-one-fifth">
            <aside class="menu">
                <ul class="menu-list">
                    <li v-for="notebook in notebooks">
                        <a>{{ notebook.displayName }}</a>
                    </li>
                </ul>
            </aside>
        </div>
    `,
    data() {
        return {
            notebooks: [],
        };
    },
});
