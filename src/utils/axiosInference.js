import axios from "axios";

const API = axios.create({
    baseURL:"http://10.22.232.237:8080"
})

export default API