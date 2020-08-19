import axios from 'axios';

const servURL = process.env.VUE_APP_API_SERVER
const fileURL = process.env.VUE_APP_FILE_SERVER

export const HTTP = axios.create({
    baseURL: servURL,
    headers:{
        //"content-type": "multipart/form-data",
        //Authorization: 'Bearer 123456'
    }
})

export const Files = fileURL