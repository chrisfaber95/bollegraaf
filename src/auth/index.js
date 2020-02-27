import {HTTP} from '@/components/http-common.js';
import router from '../router';

export default{
    user:{
        authenticated: false,
        info:{
            email: '',
            userinfo:[]
        },
        permissions: 1

    },
    login(email, pass){
        const data = {
            email: email,
            pass: pass
        }
        console.log(data);
        HTTP.post("user/login", data)
        .then(response => {
            console.log(response)
            if(!response.data.error){
                this.user.info.email = response.data.user.email;
                localStorage.setItem('id_token', response.data.user.id_token)
                localStorage.setItem('access_token', response.data.user.access_token)
                localStorage.setItem('expires', Date.now() + response.data.user.expires_in)
                localStorage.setItem('info', response.data.user.email)
                localStorage.setItem('permissions', response.data.user.permissions)
                this.user.permissions = response.data.user.permissions;
                this.user.authenticated = true;

                this.getInfo()
                router.push('home')
            }
            else{
                alert(response.data.error)
            }
        })
        .catch(e => {
            console.log(e)
        })
    },
    logout(){
        this.user.authenticated = false
        this.user.info.email = ''
        this.user.info.userinfo = []
        localStorage.clear();
        router.push('login')
    },
    register(email, pass){
        const data = {
            email: email,
            pass: pass
        }
        HTTP.post("user/register", data)
        .then(response => {
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    },
    isAuthenticated(){
        if(this.authenticated == true){
            if(localStorage.getItem('expires') > Date.now() && localStorage.getItem('access_token')){
                
                console.log(this.user + ' 1')
                return true;
            }
            else{
                this.authenticated = false;
                console.log(this.user + ' 2')
                return false;
            }
        }
        else{
            if(localStorage.getItem('expires') > Date.now() && localStorage.getItem('access_token')){
                this.authenticated = true;
                console.log(this.user + ' 3')
                return true;
            }
            else{
                console.log(this.user + ' 4')
                return false;
            }
        }
    },
    isAdmin(){
        if(this.authenticated == true){
            if(localStorage.getItem('expires') > Date.now() && localStorage.getItem('access_token') && localStorage.getItem('permissions') == 2){
                console.log(this.user + ' 5')
                return true;
            }
            else{
                this.authenticated = false;
                console.log(this.user + ' 6')
                return false;
            }
        }
        else{
            if(localStorage.getItem('expires') > Date.now() && localStorage.getItem('access_token') && localStorage.getItem('permissions') == 2){
                this.authenticated = true;
                console.log(this.user + ' 7')
                return true;
            }
            else{
                console.log(this.user + ' 8')
                return false;
            }
        }
    },
    updateInfo(){
        const data = JSON.parse(localStorage.getItem("userinfo"))
        
        HTTP.put("user/update/" + data.id, data)
        .then(response => {
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    },
    getInfo(){
        const id = localStorage.getItem("id_token");

        HTTP.get("user/"+id)
        .then(response => {
            console.log(response)
            localStorage.setItem('userinfo', JSON.stringify(response.data.user))
            this.user.info.userinfo = JSON.parse(localStorage.getItem('userinfo'))
            
        })
        .catch(e => {
            console.log(e)
        })
    },
    showInfo(){
        return this.user.info.userinfo;
    }
}