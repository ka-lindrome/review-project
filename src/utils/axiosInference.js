import axios from "axios";

const API = axios.create({
    // baseURL:"http://10.22.232.237:8081"
    baseURL:"http://127.0.0.1:8081"
})

export default API
