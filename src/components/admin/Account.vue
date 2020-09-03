<template>
  <div class="account">
        <h2>Accounts</h2>
        <hr>
        <div v-if="setting=='list'">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 hidden-xs-down"><b>Email</b></div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3 hidden-xs-down"><b>Naam</b></div>
                <div class="col-xl-2 col-lg-2 hidden-md-down"><b>Bedrijf</b></div>
                <div class="col-xl-1 col-lg-1 hidden-md-down"><b>Telefoon</b></div>
                <div class="col-xl-2 col-lg-2 hidden-md-down"><b>Accountrechten</b></div>
                <div class="col-xl-1 col-lg-1 col-md-3 hidden-sm-down"><b>Trainingen</b></div>
                <div class="col-xl-1 col-lg-1 col-md-3 hidden-sm-down"><b>Bewerken</b></div>
            </div>
            <hr>
            <div class="row accountrow" v-for="account in filteredAccounts" v-bind:key="account.id">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    {{account.email}}
                </div>
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3">
                    {{account.name}} {{account.surname}}
                </div>
                <div class="col-xl-2 col-lg-2 hidden-md-down">
                    {{account.company}}
                </div>
                <div class="col-xl-1 col-lg-1 hidden-md-down">
                    {{account.privephone}}
                </div>
                <div class="col-xl-2 col-lg-2 hidden-md-down">
                    {{account.permission_name}}
                </div>
                <div class="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3">
                    <b-button  v-b-modal.modal-3 class="bewerk-btn" @click="changeUser(account); getTrainingen(account); getProgress(account)">Openen</b-button>
                </div>
                <div class="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-xs-3 edit-col">
                    <b-button  v-b-modal.modal-2 class="btn bewerk-btn" @click="changeUser(account); getCertificates(selectedUser)"><font-awesome-icon icon="edit"></font-awesome-icon></b-button>
                    <b-button  variant="danger" v-b-modal.modal-2 class="btn delete-btn" @click="deleteUser(account)"><font-awesome-icon icon="trash-alt"></font-awesome-icon></b-button>					
                </div>
                <hr />
            </div>
            <b-modal id="modal-2" size="xl" hide-footer hide-header v-if="selectedUser">
                <div class="d-block">
                    <div class="row">
                        <div class="profile-block col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="algemeen" v-if="selectedUser">
                            <h3>Algemene informatie</h3>
                            <div class="inputrow"><p>Naam</p><input type="text" v-model="selectedUser.name"/></div>
                            <div class="inputrow"><p>Achternaam</p><input type="text"  v-model="selectedUser.surname"/></div>
                            <div class="inputrow"><p>Woonplaats</p><input type="text"  v-model="selectedUser.city"/></div>
                            <div class="inputrow"><p>Land</p><input type="text"  v-model="selectedUser.country"/></div>
                        </div>
                        <div class="profile-block col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="contact">
                            <h3>Contactinformatie</h3>
                            <div class="inputrow"><p>E-mailadres</p><input type="text"  v-model="selectedUser.email"/></div>
                            <div class="inputrow"><p>Werktelefoon</p><input type="text"  v-model="selectedUser.workphone"/></div>
                            <div class="inputrow"><p>Prive-telefoon</p><input type="text"  v-model="selectedUser.privephone"/></div>
                        </div>
                        <div class="profile-block col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="werk">
                            <h3>Werkgerelateerde informatie</h3>
                            <div class="inputrow"><p>Functie</p><input type="text"  v-model="selectedUser.function"/></div>
                            <div class="inputrow"><p>Bedrijf</p><input type="text"  v-model="selectedUser.company"/></div>
                            <div class="inputrow"><p>Plaats</p><input type="text"  v-model="selectedUser.company_city"/></div>
                            <div class="inputrow"><p>Land</p><input type="text" v-model="selectedUser.company_country"/></div>
                        </div>
                        <div class="profile-block col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="taal">
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
								
								<p>Blokkeren</p>
									<b-form-checkbox v-model="selectedUser.deleted" value="1" unchecked-value="0">
									</b-form-checkbox>
									<p>Vervaldatum</p>
									<Datepicker v-model="selectedUser.expire_date" name="expire" :format="customExpireFormat"></Datepicker>
                            </div>
                        </div>
                        <div class="profile-block col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="taal">
                            <h3>Certificaten</h3>
                            <div class="inputrow">
                                <select v-model="selectedCertificate">
                                    <option v-for="item in filteredCertificate" v-bind:key="item.value" v-bind:value="item.value">{{item.text}}</option>
                                </select>
								<b-button class="" @click="deleteCertificate(selectedCertificate)" v-if="certData != null">Verwijder</b-button>
								<b-button @click="getCertFile()" v-if="certData != null">Open</b-button>
								<br>
								<div class="inputrow"><p>Certificaatnaam</p><input type="text" v-model="certName"/></div>
								<input ref="file" id="file" type="file" @change="handleFileUpload()" accept="application/pdf">
								<b-button @click="sendFile(selectedUser)">Toevoegen</b-button>
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
							<b-form-select
								type="text" 
								name="training"
								:options="filteredTraining"
								v-model="selectedTraining"
								id= "input-1"
							></b-form-select>
							<div class="row">
								<div class="col-3">
									Onderdeel
								</div>
								<div class="col-3">
									Subonderdeel
								</div>
								<div class="col-2">
									Zichtbaar
								</div>
								<div class="col-4">
									<p>Niveau<p>
									<p>1 -> 9</p>
								</div>
                            </div>
                            <div class="row" v-for="training in filteredTrainingSub" v-bind:key="training.subonderdeel_id">
								<div class="col-3">
									{{training.oName}}
								</div>
								<div class="col-3">
									{{training.sName}}
								</div>
								<div class="col-2">
									<b-form-checkbox v-model="training.isVisible" value="1" unchecked-value="0" @change="updateTraining(training, selectedUser)">
									</b-form-checkbox>
								</div>
								<div class="col-4" v-if="training.isVisible == 1 && training.difficulty != null">
									<b-form-checkbox class="niveau" v-for="item in training.difficulty.length" v-bind:key="item" v-model="training.difficulty" :value="changeValue(training, item)" :unchecked-value="changeUnValue(training, item)" @change="updateTraining(training, selectedUser)">
									</b-form-checkbox>
								</div>
                            </div>
                        </div>
						<div class="col-6">
							<div class="progressblock">
								<div class="progressSub" v-for="sub in filteredProgress" v-bind:key="sub.sId">
									{{sub.tName}} {{sub.oName}}
									<b-progress :value="sub.countFinish" :max="sub.count" show-progress animated></b-progress>
								</div>
							</div>
						</div>
                    </div>
                </div>
                <div class="buttons">
                    <b-button class="mt-3" block @click="$bvModal.hide('modal-3')">Sluiten</b-button>
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
				<p>Vervaldatum</p>
                <Datepicker v-model="info.expire_date" name="expire" :format="customExpireFormat"></Datepicker>
            </div>
        </div>
        <b-button @click="addAccount()">Account toevoegen</b-button>
        </div>
    </div>
</template>

<script>
import {HTTP, Files} from '@/assets/scripts/http-common.js';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  name: 'HelloWorld',
	props: [
		'setting'
	],  
	components: {
		Datepicker
	},
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
            'language_id': '',
			'deleted': '',
			'expire_date': null
        },
        selectedUser: null,
		selectedTraining: null,
		selectedCertificate: null,
        trainingen: null,
        rights: null,
        language: null,
        lastSub: null,
		progress: [],
		certificates: [],
		file: '',
		certName: '',
		certData: null
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
		this.info.expire_date = this.customExpireFormat(this.info.expire_date)
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
		account.expire_date = this.customExpireFormat(account.expire_date)
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
		if(training.difficulty == 1 && training.isVisible == 0){
			training.difficulty == '000000000'
		}
		else if(training.difficulty == null && training.isVisible == 1){
			training.difficulty == '000000000'
		}
		//else if(training.difficulty.length >= 5 && training.isVisible == 1){
		//	training.difficulty == '000000000'
	//	}
		HTTP.put('/training/user/'+account.user_id, training)
		.then(response => {
			console.log(response.data)
			this.getTrainingen(account)
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
      },
	getProgress: function(account){
		HTTP.get('progress/'+account.user_id)
		.then(response =>{
			this.progress = response.data.progress
		})
	},
	getCertificates: function(account){
		HTTP.get('certificates/user/'+account.user_id)
		.then(response =>{
			this.certificates = response.data.cert
			console.log(this.certificates)
		})
	},
	handleFileUpload(){
		this.file = this.$refs.file.files[0];
	},
	sendFile(account) {
		let formData = new FormData()
		if(this.file.type == 'application/pdf'){
			formData.append('file', this.file)
			formData.append('name', this.certName)
			HTTP.post('certificates/'+account.user_id, formData,
			{
			headers: {
				'Content-Type': 'multipart/form-data'
				}
			})
			.then(response => {
				console.log(response)
				this.getCertificates(account)
			}, error => {
				console.log(error)
			});
		}
		else{
			alert("This type of file can not be uploaded, please only use PDF")
		}
	},
	changeValue: function(training, item){
		var result = training.difficulty.substring(0, item-1) + item + training.difficulty.substring(item-1 + 1)
		return result
	},
	changeUnValue: function(training, item){
		var result = training.difficulty.substring(0, item-1) + '0' + training.difficulty.substring(item-1 + 1)
		return result
	},
	getCertFile: function(){
		window.open(Files + this.certData.url, "_blank")
	},
	customExpireFormat: function(date){
		return moment(date).format('YYYY-MM-DD')
	},
	deleteUser:function(account){
		if(confirm("Do you really want to delete this?")){			
			HTTP.delete('/user/'+account.user_id)
			.then(response => {
				console.log(response.data)				
				this.getAccounts();
			})
		}
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
     filteredTrainingSub: function(){
         //return this.trainingen
         var filtered = []
        var filteredIds = []
        for(var item in this.trainingen){
			if(this.selectedTraining != null){
				if(!filteredIds.includes(this.trainingen[item].subonderdeel_id) && this.trainingen[item].training_id == this.selectedTraining){
					filtered.push(this.trainingen[item])
					filteredIds.push(this.trainingen[item].subonderdeel_id)
				}
			}
			else{
				filtered = []	
			}
       }
       console.log(filtered)
         return filtered
     },
     filteredTraining: function(){
      var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een training"})
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].training_id)){
				filtered.push({'value': this.trainingen[item].training_id, 'text': this.trainingen[item].tName})
				filteredIds.push(this.trainingen[item].training_id)
			}
		}
		console.log(filtered)
		return filtered
     },
     filteredCertificate: function(){
      var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een certificaat"})
		for(var item in this.certificates){
			if(!filteredIds.includes(this.certificates[item].certificate_id)){
				filtered.push({'value': this.certificates[item].certificate_id, 'text': this.certificates[item].name})
				filteredIds.push(this.certificates[item].certificate_id)
			}
		}
		console.log(filtered)
		return filtered
     },
    filteredProgress: function(){
		var filteredProgress = []
		var progressId = []
		for(var item in this.progress){
			if(!progressId.includes(this.progress[item].onderdeel_id) && this.trainingen[item].training_id == this.selectedTraining){
				filteredProgress.push(this.progress[item])
				progressId.push(this.progress[item].onderdeel_id)
				filteredProgress[progressId.length-1].count = 1
				if(this.progress[item].isFinished == 1){
					filteredProgress[progressId.length-1].countFinish =	1
				}
				else{
					filteredProgress[progressId.length-1].countFinish =	0					
				}
			}
			else if(this.trainingen[item].training_id == this.selectedTraining){
				if(this.progress[item].isFinished == 1){
					++filteredProgress[progressId.indexOf(this.progress[item].onderdeel_id)].countFinish
					++filteredProgress[progressId.indexOf(this.progress[item].onderdeel_id)].count
				}
				else{
					++filteredProgress[progressId.indexOf(this.progress[item].onderdeel_id)].count				
				}
			}
			console.log(filteredProgress)
		}
		return filteredProgress
    }
 },
 watch:{
     account: function(){
        
     },
	selectedCertificate: function(){
		for(var item in this.certificates){
			if(this.certificates[item].certificate_id == this.selectedCertificate){
				this.certData = this.certificates[item]
				console.log(Files + this.certData.url)
			}
		}
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

@media only screen and (max-width: 992px) {
.hidden-md-down {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
.hidden-sm-down {
    display: none;
  }
}
@media only screen and (max-width: 544px) {
.hidden-xs-down {
    display: none;
  }
}
.niveau{
	display: inline-flex;
}
.edit-col{
	display: inline-flex;
}
.edit-col .btn{
	display: block;
}
.delete-btn{
    padding: 5px;
    margin: 5px;
    background-color: rgba(255,0,0,1);
}
</style>
