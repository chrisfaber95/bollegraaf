<template>
  <div class="account">
        <h2>Account</h2>
        <hr>
        <div v-if="setting=='list'">
            <div class="row">
                <div class="col-3"><p>Email</p></div>
                <div class="col-2"><p>Naam</p></div>
                <div class="col-2"><p>Woonplaats</p></div>
                <div class="col-2"><p>Bedrijf</p></div>
                <div class="col-1"><p>Telefoon</p></div>
                <div class="col-1"><p>Voortgang</p></div>
                <div class="col-1"><p>Bewerken</p></div>
            </div>
            <hr>
            <div class="row" v-for="account in filteredAccounts" v-bind:key="account.id">
                <div class="col-xl-3 col-lg-3">
                    {{account.email}}
                </div>
                <div class="col-xl-2 col-lg-2">
                    {{account.name}} {{account.surname}}
                </div>
                <div class="col-xl-2 col-lg-2">
                    {{account.city}}
                </div>
                <div class="col-xl-2 col-lg-2">
                    {{account.company}}
                </div>
                <div class="col-xl-1 col-lg-1">
                    {{account.privephone}}
                </div>
                <div class="col-xl-1 col-lg-1">
                    <b-button  v-b-modal.modal-3 class="bewerk-btn" @click="changeUser(account); getTrainingen(account);">Openen</b-button>
                </div>
                <div class="col-xl-1 col-lg-1">
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
                            <div class="inputrow"><p>Taal</p><input type="text" v-model="selectedUser.Language_id"/></div>
                            <div class="inputrow"><p>Rechten</p><input type="text" v-model="selectedUser.Permissions_id"/></div>
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
                            
                            <div class="row" v-for="training in trainingen" v-bind:key="training.id">
                                Training: {{training.tName}} -- {{training.oName}} -- {{training.sName}} -- Is visible? <b-form-checkbox v-model="training.isVisible" value="1" unchecked-value="0" @change="updateTraining(training)"></b-form-checkbox>
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
            <div class="inputrow"><p>E-mailadres</p><input type="text"  v-model="info.name"/></div>
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
            <div class="inputrow"><p>Taal</p><input type="text" /></div>
            <div class="inputrow"><p>Rechten</p><input type="text" /></div>
        </div>
        <b-button>Account toevoegen</b-button>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/components/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  data: function(){
    return{
        account: [],
        info: [],
        selectedUser: null,
        trainingen: null
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
      updateAccounts: function(account){
          HTTP.put('user/update/'+account.id+'/', account)
          .then(response => {
            console.log(response.data)
            return response.data.user
          })
      },
      getTrainingen: function(account){
          HTTP.get('user/'+account.id+'/training/')
          .then(response => {
            console.log(response.data)
            this.trainingen = response.data.training
            return response.data.training
          })
      },
      updateTraining: function(training){
          HTTP.put('user/'+this.selectedUser.id+'/training/' + training.sId, training)
          .then(response => {
            console.log(response.data)
          })
      },
      closeModal: function(){
        this.$bvModal.hide('modal-2')
      },
      changeUser: function(user){
          this.selectedUser = user
      }

  },
  mounted(){
      this.getAccounts();
 },
 computed:{
     filteredAccounts: function(){
         return this.account
     }
 },
 watch:{
     account: function(){
         console.log("accounts added");
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
    padding: 0;
    margin: 0;
    background-color: rgba(0,0,0,0);
}
</style>
