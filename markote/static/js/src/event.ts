import Vue from 'vue'

class Event {
    private vue: Vue = new Vue()

    public fire(eventName: string, data: any) {
        this.vue.$emit(eventName, data)
    }

    public listen(eventName: string, callback: any) {
        this.vue.$on(eventName, callback)
    }
}

const event = new Event()

export default event
