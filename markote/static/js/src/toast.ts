import Vue from 'vue'

const toast = new Vue({
    methods: {
        danger(message) {
            this.$toast.open({
                duration: 3000,
                message,
                position: 'is-bottom',
                type: 'is-danger',
            })
        },
    },
})

export default toast
