<template>
  <div class="admin">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Admin</h2>
        <div class="admin-block">
            <div class="row">  
                <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12">
                    <h3><font-awesome-icon icon="users" /></h3><h4>Users</h4>
                    <b-button @click="changeTopic('account', 'list')">Overzicht</b-button>
                    <b-button @click="changeTopic('account', 'add')">Toevoegen</b-button>
                        <hr />

                    <h3><font-awesome-icon icon="book-open" /></h3><h4>Training</h4>
                    <b-button @click="changeTopic('training', 'list')">Overzicht</b-button>
                   <!-- <b-button @click="changeTopic('training', 'add')">Toevoegen</b-button>-->
                    <b-button @click="changeTopic('training', 'suggesties')">Suggesties</b-button>
                        <hr />
                
				<h3><font-awesome-icon icon="file" /></h3><h4>Exam</h4>
                    <b-button @click="changeTopic('test', 'list')">Overzicht</b-button>
                    <b-button @click="changeTopic('test', 'add')">Toevoegen</b-button>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
                    <div class="topic-block">
                        <Adminaccount :setting ="setting"  v-if="topic=='account'"/>
                        <Admintraining  :setting="setting"  v-if="topic=='training'"/>
                        <Admintest  :setting="setting"  v-if="topic=='test'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/general/Header.vue'
import Adminaccount from '@/components/admin/Account.vue'
import Admintraining from '@/components/admin/Training.vue'
import Admintest from '@/components/admin/Test.vue'
import auth from '@/assets/scripts/auth';

export default {
  name: 'Home',
  components: {
      Header,
      Adminaccount,
      Admintraining,
      Admintest
  },
  data: function(){
    return{
        topic: "account",
        setting: ""
    }
  },
  methods:{
    saveInfo: function (){
      auth.getInfo(this.userLogin.email, this.userLogin.pass);
    },
    getInfo: function (){
      return JSON.parse(localStorage.getItem('userinfo'))
    },
    getEmail: function (){
      return localStorage.getItem('info')
    },
    changeTopic: function(topic, setting){
        this.topic = topic
        this.setting = setting
    }
  },
  created(){
  },
  mounted(){
    console.log(this.getInfo())
    this.changeTopic('account', 'list')
  },
  computed:{
  }
}
</script>

<style scoped>
  .pagetitle{
      border-bottom: 1px solid orange;
      text-align: start;
  }
  .admin{
    min-height: 100vh;
  }

    .admin-block{
        background-color:#EFEFEF;
        padding: 15px;
        margin: 15px;
      text-align: start;
    }
    .admin-block button{
        margin: 10px;
        width: 100%;
    }
  .admin .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
  }

  #cert{
      width: 50%;
  } 
  #progress{
      width: 33%;
  }
	
.btn{
	background-color: #96BF31;
}
.btn:hover{
	background-color: #203780;
}
</style>