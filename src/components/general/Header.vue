<template>
    <div class="navigation" id="navbar">
        <div class="row">
            <div class="logo">
                <b-navbar-brand href="#">
                    <img class="img-fluid" src= "@/assets/Bollegraaf_logo_wit.png" height="40" width="200">
                </b-navbar-brand>
            </div>
            <div class="navlist">
                <b-navbar toggleable="lg" type="dark" variant="info">

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <router-link to="/home" tag="b-nav-item">{{ $t("header.home") }}</router-link>
                        <b-nav-item-dropdown :text="$t('header.welcome')  + getHeader">
                            <router-link :to="{ name: 'Profile'}" tag="b-dropdown-item">{{ $t("header.profile") }}</router-link>
                            <router-link :to="{ name: 'Settings'}" tag="b-dropdown-item">{{ $t("header.settings") }}</router-link>
                        </b-nav-item-dropdown>
                        <router-link to="/training" tag="b-nav-item">{{ $t("header.training") }}</router-link>
                        <router-link to="/progress" tag="b-nav-item">{{ $t("header.progress") }}</router-link>                        
                        <router-link to="/exam" tag="b-nav-item">{{ $t("header.exams") }}</router-link>
                        <div id="bericht-navlink">
                            <router-link to="/messages" tag="b-nav-item">{{ $t("header.message") }} {{notReaded}}</router-link>
                            <div v-if="notOpenedMail" class="berichtheader-blok">
                                <p>{{ $t("header.message") }}</p>
                                <hr>
                                <p>{{notOpenedMail.mDate}}</p>
                                <p>{{notOpenedMail.mSubject}}</p>
                                <hr>
                                <router-link to="/messages" tag="b-nav-item">Bekijk alle berichten</router-link>
                            </div>
                        </div>
                        <router-link to="/admin" tag="b-nav-item" v-if="permissions == 2">{{ $t("header.admin") }}</router-link>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">						
						<select v-model="language_code">
							<option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.code">{{item.name}}</option>
						</select>
                        <router-link to="/help" tag="b-nav-item">{{ $t("header.help") }}</router-link>
                        <b-button  v-b-modal.modal-1 tag="b-nav-item">{{ $t("header.quit") }}</b-button>
                    </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
                <div class="breadcrumbs container-fluid">
                    <nav id="breadcrumb">
                        <b-button class="breadcrumb-item" :to="'/'+ breadcrumb.link" v-for="(breadcrumb, index) in  breadcrumbList" v-bind:key="index">
                            <span class="breadcrumb-item active">{{breadcrumb.name}} </span>
                        </b-button>
                        
                    </nav>
                </div>
            </div>
        </div>
        <b-modal id="modal-1" hide-footer hide-header>
            <p class="d-block text-center">Weet je zeker dat je wilt afsluiten?</p>
            <div class="buttons">
                <b-button class="mt-3" block @click="closeProgram(0)">Ja</b-button>
                <b-button class="mt-3" block @click="closeProgram(1)">Nee</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import auth from '@/assets/scripts/auth';
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'HelloWorld',
  props: [
  ],
  data: function(){
    return{
        showModal: false,
        permissions: 1,
        breadcrumbList: null,
        notOpenedMail: null,
        notReaded: 0,
        language: null,
		language_code: null,
		language_id: 0
    }
  },
  methods:{
      getName: function(){
        //  return JSON.parse(localStorage.getItem('userinfo')).name + " " + JSON.parse(localStorage.getItem('userinfo')).surname
        return ""
      },
      getHeaderName: function(){
          return ", " + JSON.parse(localStorage.getItem('userinfo'))[0].name + " " + JSON.parse(localStorage.getItem('userinfo'))[0].surname
      },
      closeProgram: function(id){
          if(id == 0){
            this.$bvModal.hide('modal-1')
            auth.logout();
          }
          else if(id == 1){
              this.$bvModal.hide('modal-1')
          }
      },
      updateList(){
          this.breadcrumbList = this.$route.meta.breadcrumbs;
      },
      getLatestMail(){
        HTTP.get('message/single/'+localStorage.getItem('id_token'))
        .then(response =>{
            console.log(response)
            this.notOpenedMail = response.data.message.find(this.searchLatestNotOpened);
            
                for (var x of response.data.message) {
                if (x.isOpened == 0) {
                    this.notReaded++;
                }
            }
        })
      },
      searchLatestNotOpened(mail){
          return mail.isOpened == 0;
      },
      getLanguage: function(){
          HTTP.get('settings/language/')
          .then(response => {
            this.language = response.data.language
            console.log(this.language)
			this.language_code = localStorage.getItem('language_code')
            return this.language
          })
      }
  },
  mounted(){
      this.permissions = localStorage.getItem('permissions')
      console.log(this.permissions)
      this.updateList();
      console.log(this.breadcrumbList);
      this.getLatestMail();
      this.getLanguage();
 },
 watch: {
     '$route' (){
         this.updateList()
     },
	language_code: function(){
		console.log(this.language)
		localStorage.setItem('language_code', this.language_code)
		for(var item in this.language){
			if(this.language[item].code == this.language_code){
				this.language_id = this.language[item].language_id
			}
		}
		console.log(localStorage.language_code)
		this.$i18n.locale = localStorage.language_code
	}
 },
 computed: {
     getHeader: function(){
         var head = '';
         if(JSON.parse(localStorage.getItem('userinfo')) != null){
            head = ", " + JSON.parse(localStorage.getItem('userinfo'))[0].name + " " + JSON.parse(localStorage.getItem('userinfo'))[0].surname
         }
         return head;
     },
     filteredLanguage: function(){
         return this.language
     }
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttons{
    display:inline-flex;
    width: 100%;
    margin: 20px;
}
.buttons button{
    width: 25%;
    margin-left: auto;
    margin-right: auto;
}
.logo{
    width:12%;
    padding-left: 20px;
}
.navlist{
    width: 88%;
}
.navigation{
    width:100vw
}
.breadcrumbs{
    margin: 0;
    margin-bottom: 0 !important;
    text-align: start;
    background-color: #efefef;
}
#breadcrumb .btn-secondary{
    background-color: unset;
    border-color: unset;
    color: #efefef;
	display: inline-flex;
}
#breadcrumb .btn-secondary:hover{
    background-color: unset;
    border-color: unset;
    color: #fff;
}

nav{
    margin: 0;
    margin-bottom: 0 !important;
    padding: 0.5rem 1rem;
}
.breadcrumbs p{
    margin: 0;
    padding: 0.5rem 1rem;
}
.navbar{
    background-color: #454545 !important;
    padding: 0;
}
#navbar .row{
    margin: 0;
}

.navbar-nav .nav-item{
    background-color: #656565;
    border-right: 2px solid #ffffff;
    margin: 0;
    padding: 0 10px;
    font-weight: 600;
}

#navbar .nav-item .nav-link.dropdown-toggle::after{
    color:#94D567;
}
.nav-item.btn{
    padding: 0;
    background-color: #454545 !important;
    border: none;
    border-left: 3px solid #ffffff;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#bericht-navlink .berichtheader-blok{
    position: absolute;
    border: 1px solid #777777;
    background-color: #ffffff;
    width: 200px;
    text-align: left;
    z-index: 2000;
    display: none;
}

#bericht-navlink:hover .berichtheader-blok{
    display: block;
}

.berichtheader-blok hr{
    margin-top: 0;
}

.berichtheader-blok p{
    margin-bottom: 0px;
}
</style>
