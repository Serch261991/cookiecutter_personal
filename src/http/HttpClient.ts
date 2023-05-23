import axios from "axios";

export default axios.create({
    //baseURL: 'https://localhost:7178',
    baseURL: 'http://172.19.64.101:81/ptch.app',
    headers: {
        'Content-Type': 'application/json'
    }
})