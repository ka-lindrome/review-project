import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json'
const APIAI = axios.create({
    baseURL:"http://127.0.0.1:5000"
})

export default APIAI
