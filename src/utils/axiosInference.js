import axios from "axios";

const API = axios.create({
    baseURL:"http://10.22.232.237:8081"
})

export default API
