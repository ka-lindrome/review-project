import axios from "axios";

const API = axios.create({
    baseURL:"http://172.20.10.8:8080"
})

export default API