import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'http://localhost:3001/',
    headers:{
        //"content-type": "multipart/form-data",
        //Authorization: 'Bearer 123456'
    }
})