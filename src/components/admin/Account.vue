<template>
  <div class="account">
        <h2>Account</h2>
        <hr>
        <div v-if="setting=='list'">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"><b>Email</b></div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3"><b>Naam</b></div>
                <div class="col-xl-2 col-lg-2 hidden-md-down"><b>Bedrijf</b></div>
                <div class="col-xl-1 col-lg-1 hidden-md-down"><b>Telefoon</b></div>
                <div class="col-xl-2 col-lg-2 hidden-md-down"><b>Accountrechten</b></div>
                <div class="col-xl-1 col-lg-1 hidden-md-down"><b>Trainingen</b></div>
                <div class="col-xl-1 col-lg-1 hidden-md-down"><b>Bewerken</b></div>
            </div>
            <hr>
            <div class="row accountrow" v-for="account in filteredAccounts" v-bind:key="account.id">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    {{account.email}}
                </div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3">
                    {{account.name}} {{account.surname}}
                </div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3">
                    {{account.company}}
                </div>
                <div class="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3">
                    {{account.privephone}}
                </div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3">
                    {{account.permission_name}}
                </div>
                <div class="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3">
                    <b-button  v-b-modal.modal-3 class="bewerk-btn" @click="changeUser(account); getTrainingen(account);">Openen</b-button>
                </div>
                <div class="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3">
                    <b-button  v-b-modal.modal-2 class="bewerk-btn" @click="changeUser(account)">Bewerk</b-button>
                </div>
                <hr />
            </div>
            <b-modal id="modal-2" size="xl" hide-footer hide-header v-if="selectedUser">
                <div class="d-block">
                    <div class="row">
                        <div class="profile-block col-6" id="algemeen" v-if="selectedUser">
                            <h3>Algemene informatie</h3>
                            <div class="inputrow"><p>Naam</p><input type="text" v-model="selectedUser.name"/></div>
                            <div class="inputrow"><p>Achternaam</p><input type="text"  v-model="selectedUser.surname"/></div>
                            <div class="inputrow"><p>Woonplaats</p><input type="text"  v-model="selectedUser.city"/></div>
                            <div class="inputrow"><p>Land</p><input type="text"  v-model="selectedUser.country"/></div>
                        </div>
                        <div class="profile-block col-6" id="contact">
                            <h3>Contactinformatie</h3>
                            <div class="inputrow"><p>E-mailadres</p><input type="text"  v-model="selectedUser.email"/></div>
                            <div class="inputrow"><p>Werktelefoon</p><input type="text"  v-model="selectedUser.workphone"/></div>
                            <div class="inputrow"><p>Prive-telefoon</p><input type="text"  v-model="selectedUser.privephone"/></div>
                        </div>
                        <div class="profile-block col-6" id="werk">
                            <h3>Werkgerelateerde informatie</h3>
                            <div class="inputrow"><p>Functie</p><input type="text"  v-model="selectedUser.function"/></div>
                            <div class="inputrow"><p>Bedrijf</p><input type="text"  v-model="selectedUser.company"/></div>
                            <div class="inputrow"><p>Plaats</p><input type="text"  v-model="selectedUser.company_city"/></div>
                            <div class="inputrow"><p>Land</p><input type="text" v-model="selectedUser.company_country"/></div>
                        </div>
                        <div class="profile-block col-6" id="taal">
                            <h3>Voorkeuren</h3>
                            <div class="inputrow">
                                <p>Taal</p>
                                <select v-model="selectedUser.language_id">
                                    <option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="inputrow">
                                <p>Rechten</p>
                                <select v-model="selectedUser.permission_id">
                                    <option v-for="item in filteredRights" v-bind:key="item.permission_id" v-bind:value="item.permission_id">{{item.name}}</option>
                                </select>
                                {{selectedUser.permission_id}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <b-button class="mt-3" block @click="updateAccounts(selectedUser); closeModal()">Wijzigingen opslaan</b-button>
                    <b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
                </div>
            </b-modal>
            <b-modal id="modal-3" size="xl" hide-footer hide-header v-if="selectedUser">
                <div class="d-block">
                    <div class="row">
                        <div class="profile-block col-6" id="algemeen" v-if="selectedUser">
                            
                            <div class="row" v-for="training in filteredTraining" v-bind:key="training.subonderdeel_id">
                                Training: {{training.tName}} -- {{training.oName}} -- {{training.sName}} -- Is visible? 
                                <b-form-checkbox v-model="training.isVisible" value="1" unchecked-value="0" @change="updateTraining(training, selectedUser)">

                                </b-form-checkbox>
                                {{training.isVisible}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <b-button class="mt-3" block @click="closeModal()">Wijzigingen opslaan</b-button>
                    <b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
                </div>
            </b-modal>
        </div>
        <div class="add-block row" v-if="setting=='add'">
        <div class="profile-block col-6" id="algemeen">
            <h3>Algemene informatie</h3>
            <div class="inputrow"><p>Naam</p><input type="text" v-model="info.name"/></div>
            <div class="inputrow"><p>Achternaam</p><input type="text"  v-model="info.surname"/></div>
            <div class="inputrow"><p>Woonplaats</p><input type="text"  v-model="info.city"/></div>
            <div class="inputrow"><p>Land</p><input type="text"  v-model="info.country"/></div>
        </div>
        <div class="profile-block col-6" id="contact">
            <h3>Contactinformatie</h3>
            <div class="inputrow"><p>E-mailadres</p><input type="text"  v-model="info.email"/></div>
            <div class="inputrow"><p>Werktelefoon</p><input type="text"  v-model="info.workphone"/></div>
            <div class="inputrow"><p>Prive-telefoon</p><input type="text"  v-model="info.privephone"/></div>
        </div>
        <div class="profile-block col-6" id="werk">
            <h3>Werkgerelateerde informatie</h3>
            <div class="inputrow"><p>Functie</p><input type="text"  v-model="info.function"/></div>
            <div class="inputrow"><p>Bedrijf</p><input type="text"  v-model="info.company"/></div>
            <div class="inputrow"><p>Plaats</p><input type="text"  v-model="info.company_city"/></div>
            <div class="inputrow"><p>Land</p><input type="text" v-model="info.company_country"/></div>
        </div>
        <div class="profile-block col-6" id="taal">
            <h3>Voorkeuren</h3>
            <div class="inputrow"><p>Taal</p>
                <select v-model="info.language_id">
                    <option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
                </select>
            </div>
            <div class="inputrow">
                <p>Rechten</p>
                <select v-model="info.permission_id">
                    <option v-for="item in filteredRights" v-bind:key="item.permission_id" v-bind:value="item.permission_id">{{item.name}}</option>
                </select>
            </div>
        </div>
        <b-button @click="addAccount()">Account toevoegen</b-button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  data: function(){
    return{
        account: [],
        info: {
            'name': '',
            'surname': '',
            'city': '',
            'country': '',
            'email': '',
            'workphone': '',
            'privephone': '',
            'function': '',
            'company': '',
            'company_city': '', 
            'company_country': '',
            'permission_id': '',
            'language_id': ''
        },
        selectedUser: null,
        trainingen: null,
        rights: null,
        language: null,
        lastSub: null
    }
  },
  methods:{
      getAccounts: function(){
          HTTP.get('user')
          .then(response => {
            console.log(response.data)
            this.account = response.data.user
            return response.data.user
          })
      },
      addAccount: function(){
          console.log(this.info)
          HTTP.post('user', this.info)
          .then(response => {
            console.log(response.data)
            this.account = response.data.user
			alert("accounts added");
			this.getAccounts();
            return response.data.user
          })
      },
      updateAccounts: function(account){
          console.log(account)
          HTTP.put('user/update/'+account.user_id+'/', account)
          .then(response => {
            console.log(response.data)
            return response.data.user
          })
      },
      getTrainingen: function(account){
          HTTP.get('/training/user/'+account.user_id)
          .then(response => {
            console.log(response.data)
            this.trainingen = response.data.training
            return response.data.training
          })
      },
      updateTraining: function(training, account){
          console.log(training)
          HTTP.put('/training/user/'+account.user_id, training)
          .then(response => {
            console.log(response.data)
          })
      },
      closeModal: function(){
        this.$bvModal.hide('modal-2')
      },
      changeUser: function(user){
          console.log(user)
          this.selectedUser = user
      },
      getRights: function(){
          HTTP.get('settings/rights/')
          .then(response => {
            this.rights = response.data.rights
            console.log(this.rights)
            return this.rights
          })
      },
      getLanguage: function(){
          HTTP.get('settings/language/')
          .then(response => {
            this.language = response.data.language
            console.log(this.language)
            return this.language
          })
      }

  },
  mounted(){
      this.getAccounts();
      this.getRights();
      this.getLanguage();
 },
 computed:{
     filteredAccounts: function(){
         return this.account
     },
     filteredRights: function(){
         return this.rights
     },
     filteredLanguage: function(){
         return this.language
     },
     filteredTraining: function(){
         //return this.trainingen
         var filtered = []
        var filteredIds = []
        for(var item in this.trainingen){
         if(!filteredIds.includes(this.trainingen[item].subonderdeel_id)){
           filtered.push(this.trainingen[item])
           filteredIds.push(this.trainingen[item].subonderdeel_id)
         }
       }
       console.log(filtered)
         return filtered
     }
 },
 watch:{
     account: function(){
        
     }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.profile-block{
    padding: 10px;
}
.profile-block h3{
    margin: 10px 0 0;
}
.training{
    border:1px solid #333333;
    margin-bottom: 20px;
}
.trainingimg{
    width:30%;
    height: 100%;
    overflow: hidden;
}
.trainingimg img{
    max-width: 170%
}
.traininginfo{
    width:70%;
}
.start-btn{
  padding-bottom: 10px;
}
.add-block{
    display: inline-flex;
}
.add-block p{
    margin-bottom: 2px;
}
.bewerk-btn{
    padding: 5px;
    margin: 5px;
    background-color: rgba(0,0,0,0);
}
.accountrow{
  margin: auto;
	overflow-wrap: break-word;	
	border-bottom: 1px solid #cccccc
}

.btn.bewerk-btn{
	background-color: #96BF31;
}
.btn.bewerk-btn:hover{
	background-color: #203780;
}
</style>
