<template>
  <div class="login">
    <div class="loginform">
        <img class="img-fluid" src= "../assets/Bollegraaf_logo_wit.png" height="40" width="200">
        <p><b>Welkom,</b>Log in astublieft</p>
        <b-input type="text" placeholder="Gebruikersnaam" v-model="userLogin.email"/>
        <b-input type="password" placeholder="Wachtwoord" v-model="userLogin.pass"/>
        <b-button @click="login()">Inloggen</b-button>
       <!-- <b-button @click="register()">register</b-button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from '@/assets/scripts/auth';

export default {
  name: 'Home',
  components: {
  },
  data: function(){
    return{
      userLogin: {
        email: null,
        pass: null
      }
    }
  },
  methods:{
    login: function (){
      auth.login(this.userLogin.email, this.userLogin.pass);
    },
    register: function (){
      auth.register(this.userLogin.email, this.userLogin.pass);
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.login{
    margin-left:auto;
    margin-right:auto;
    margin-top: 30vh;
    margin-bottom: 30vh;
}
.loginform{
    background:grey;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding:10px 50px;
    text-align: left;
}

input{
    width:100%;
    margin:  20px auto 10px auto;
}

p{
  padding:20px 0 10px 0;
}

button{
    margin: 20px 0;
}

#app{
    overflow: hidden;
}
</style>