<template>
  <div class="admin">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Admin</h2>
        <div class="admin-block">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12">
					<div class="users" v-if="getPermission() == 2">
						<font-awesome-icon icon="users" />
						<b-dropdown id="user-menu" :text='$t("admin.words.users")'>
							<b-dropdown-item @click="changeTopic('account', 'list')">{{ $t("admin.words.overview") }}</b-dropdown-item>
							<b-dropdown-item @click="changeTopic('account', 'add')">{{ $t("admin.words.add") }}</b-dropdown-item>
						</b-dropdown>
						<hr />
					</div>
					<font-awesome-icon icon="book-open" />
					<b-dropdown id="user-menu" :text='$t("admin.words.training")'>
						<b-dropdown-item @click="changeTopic('training', 'list')">{{ $t("admin.words.overview") }}</b-dropdown-item>
					</b-dropdown>
					<hr />
					
					<font-awesome-icon icon="file" />
					<b-dropdown id="user-menu" :text='$t("admin.words.exam")'>
						<b-dropdown-item @click="changeTopic('test', 'list')">{{ $t("admin.words.overview") }}</b-dropdown-item>
						<b-dropdown-item @click="changeTopic('test', 'add')">{{ $t("admin.words.add") }}</b-dropdown-item>
					</b-dropdown>
				</div>
                <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
                    <div class="topic-block">
                        <Adminaccount :setting ="setting"  v-if="topic=='account' && getPermission() == 2" />
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
    getPermission: function (){
      return auth.getPermission()
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

@media only screen and (max-width: 768px) {
.admin-block .btn {
    width: 30%;
  }
}
</style>