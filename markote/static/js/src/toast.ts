import Vue from 'vue'

const toast = new Vue({
    methods: {
        danger(message) {
            this.$toast.open({
                duration: 5000,
                message,
                position: 'is-bottom',
                type: 'is-danger',
            })
        },
    },
})

export default toast
