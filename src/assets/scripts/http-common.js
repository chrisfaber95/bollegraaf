import axios from 'axios';

export const HTTP = axios.create({
    baseURL: '/api/',
    headers:{
        //"content-type": "multipart/form-data",
        //Authorization: 'Bearer 123456'
    }
})