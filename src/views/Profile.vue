<template>
  <div class="profiel">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Profiel</h2>
        <div class="profile-block">
            <h3>Persoonlijke informatie</h3>
            <div class="row">
                <div class="col-4">
                <h4>Algemene informatie</h4>
                <p>Voornaam: {{getInfo()[0].name}}</p>
                <p>Achternaam: {{getInfo()[0].surname}}</p>
                <p>Woonplaats: {{getInfo()[0].city}}</p>
                <p>Land: {{getInfo()[0].country}}</p>
                </div>
                <div class="col-4">
                    <h4>Contactgegevens</h4>
                    <p>E-mailadres: {{getEmail()}}</p>
                    <p>Werktelefoon: {{getInfo()[0].workphone}}</p>
                    <p>Prive-telefoon: {{getInfo()[0].privephone}}</p>
                </div>
                <div class="col-4">
                    <h4>Werkgerelateerde gegevens</h4>
                    <p>Functie: {{getInfo()[0].function}}</p>
                    <p>Bedrijf: {{getInfo()[0].company}}</p>
                    <p>Plaats: {{getInfo()[0].company_city}}</p>
                    <p>Land: {{getInfo()[0].company_country}}</p>
                </div>
            </div>
        </div>
        <div class="profile-block" id="cert">
            <h3>Behaalde certficaten</h3>
            <p v-if="filteredCertificate.lenght == 0">Nog geen behaalde certificaten</p>
			<div class="inputrow">
				<select v-model="selectedCertificate">
					<option v-for="item in filteredCertificate" v-bind:key="item.value" v-bind:value="item.value">{{item.text}}</option>
				</select>
				<b-button v-if="certData != null" @click="deleteCertificate(selectedCertificate)">Verwijder</b-button>
				<b-button @click="getCertFile()" v-if="certData != null">Open</b-button>
				<br>
				<div class="inputrow"><p>Certificaatnaam</p><input type="text" v-model="certName"/></div>
				<input ref="file" id="file" type="file" @change="handleFileUpload()" accept="application/pdf">
				<b-button @click="sendFile()">Toevoegen</b-button>
			</div> 
        </div>
        <div class="profile-block" id="progress">
            <h3>Mijn voortgang</h3>
            <p>Bekijk hier uw voortgang</p>
              <b-button @click="saveInfo()">Wijzigingen opslaan</b-button>
        </div>
        <div class="profile-block" id="info-btn">
            <router-link to='/settings' ><b-button>Gegevens wijzigen</b-button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/general/Header.vue'
import auth from '@/assets/scripts/auth';
import {HTTP, Files} from '@/assets/scripts/http-common.js';

export default {
  name: 'Home',
  components: {
      Header
  },
  data: function(){
    return{
		certificates: [],
		selectedCertificate: null,
		certData: null,
		file: '',
		certName: ''
    }
  },
  methods:{
    saveInfo: function (){
      auth.getInfo(this.userLogin.email, this.userLogin.pass);
    },
    getInfo: function (){
      console.log(JSON.parse(localStorage.getItem('userinfo')))
      return JSON.parse(localStorage.getItem('userinfo'))
    },
    getEmail: function (){
      return localStorage.getItem('info')
    },
	getCertificates: function(account){
		HTTP.get('certificates/user/'+account)
		.then(response =>{
			this.certificates = response.data.cert
			console.log(this.certificates)
		})
	},
	handleFileUpload(){
		this.file = this.$refs.file.files[0];
	},
	sendFile() {
		var account = auth.getId()
		let formData = new FormData()
		if(this.file.type == 'application/pdf'){
			formData.append('file', this.file)
			formData.append('name', this.certName)
			HTTP.post('certificates/'+account, formData,
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
	getCertFile: function(){
		window.open(Files + this.certData.url, "_blank")
	}
  },
  created(){
  },
  mounted(){
      auth.getInfo();
	this.getCertificates(auth.getId())
  },
  computed:{
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
     }
  },
  watch:{
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

<style scoped>
  .pagetitle{
      border-bottom: 1px solid orange;
      text-align: start;
  }
  .profiel{
    min-height: 100vh;
  }

    .profile-block{
        background-color:#EFEFEF;
        padding: 15px;
        margin: 15px;
      text-align: start;
    }
    #info-btn{
        background-color: #ffffff;
    }
  .profiel .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
  }

  #cert{
      width: 50%;
  } 
  #progress{
      width: 33%;
  }
</style>