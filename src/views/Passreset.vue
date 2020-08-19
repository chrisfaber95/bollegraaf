<template>
  <div class="login">
    <div class="loginform">
        <img class="img-fluid" src= "../assets/Bollegraaf_logo_wit.png" height="40" width="200">
        <!--<p>{{ $t("message.forgetPasswordMessage") }}</p>-->
        <b-input type="text" :placeholder="$t('words.username')" v-model="userLogin.email"/>
        <b-input type="password" :placeholder="$t('words.password')" v-model="userLogin.pass"/>
        <b-input type="password" :placeholder="'Herhaal ' + $t('words.password')" v-model="userLogin.secondpass"/>
        <b-button @click="forgotPassword()">Wijzig wachtwoord</b-button>
       <!-- <b-button @click="register()">register</b-button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from '@/assets/scripts/auth';
import {HTTP} from '@/assets/scripts/http-common.js';

export default {
  name: 'Home',
  components: {
  },
  data: function(){
    return{
		userLogin: {
			email: null,
			pass: null,
			secondpass: null
		}
    }
  },
  methods:{
    login: function (){
		auth.login(this.userLogin.email, this.userLogin.pass);
		this.$i18n.locale = auth.user.language_code
    },
    register: function (){
		auth.register(this.userLogin.email, this.userLogin.pass);
    },
	forgotPassword: function(){
		if(this.userLogin.pass != this.userLogin.secondpass){
			alert("Passwords are not the same")
		}
		else{
			var data = {
				email: this.userLogin.email,
				pass: this.userLogin.pass,
				token: this.$route.query.token
			}
			HTTP.put('user/forget', data)
			.then(response => {
				console.log(response.data)
				alert("You have succesfully changed your password")
				window.location = "/"
				return true
			})
		}
		/*
		*/
	}
  },
  mounted(){
  console.log(this.$route)
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