import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'http://chrisfaber.tk:3001/',
    headers:{
        //"content-type": "multipart/form-data",
        //Authorization: 'Bearer 123456'
    }
})