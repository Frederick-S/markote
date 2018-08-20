import axios from 'axios'

axios.interceptors.response.use((response) => {
    if ([200, 201, 204].includes(response.status)) {
        return response
    } else {
        return Promise.reject(response)
    }
}, (error) => {
    return Promise.reject(error)
})

export default axios
