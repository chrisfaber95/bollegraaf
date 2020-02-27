<template>
  <div class="instellingen">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Instellingen</h2>
        <div class="profile-block" id="algemeen">
            <h3>Algemene informatie</h3>
            <div class="inputrow"><p>Naam</p><input type="text" v-model="info.name"/></div>
            <div class="inputrow"><p>Achternaam</p><input type="text"  v-model="info.surname"/></div>
            <div class="inputrow"><p>Woonplaats</p><input type="text"  v-model="info.city"/></div>
            <div class="inputrow"><p>Land</p><input type="text"  v-model="info.country"/></div>
        </div>
        <div class="profile-block" id="contact">
            <h3>Contactinformatie</h3>
            <!--<div class="inputrow"><p>E-mailadres</p><input type="text"  v-model="info.name"/></div> -->
            <div class="inputrow"><p>Werktelefoon</p><input type="text"  v-model="info.workphone"/></div>
            <div class="inputrow"><p>Prive-telefoon</p><input type="text"  v-model="info.privephone"/></div>
        </div>
        <div class="profile-block" id="werk">
            <h3>Werkgerelateerde informatie</h3>
            <div class="inputrow"><p>Functie</p><input type="text"  v-model="info.function"/></div>
            <div class="inputrow"><p>Bedrijf</p><input type="text"  v-model="info.company"/></div>
            <div class="inputrow"><p>Plaats</p><input type="text"  v-model="info.company_city"/></div>
            <div class="inputrow"><p>Land</p><input type="text" v-model="info.company_country"/></div>
        </div>
        <div class="profile-block" id="taal">
            <h3>Voorkeuren</h3>
            <div class="inputrow"><p>Taal</p><input type="text" /></div>
        </div>
        <div class="profile-block" id="wachtwoord">
            <h3>Wachtwoord wijzigen</h3>
            <div class="inputrow"><p>Huidig wachtwoord</p><input type="text" /></div>
        </div>
        <b-button @click="saveInfo()">Wijzigingen opslaan</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/Header.vue'
import auth from '@/auth';

export default {
  name: 'Home',
  components: {
      Header
  },
  data: function(){
    return{
        info: {}
    }
  },
  methods:{
    saveInfo: function (){
        console.log(this.info)
      localStorage.setItem('userinfo', JSON.stringify(this.info))
      auth.updateInfo()
    },
    getInfo: function (){
      if(!localStorage.getItem('userinfo')){
        auth.getInfo();
      }
      this.info = JSON.parse(localStorage.getItem('userinfo'))[0]
      console.log(this.info)
    },
    getEmail: function (){
      return localStorage.getItem('info')
    }
  },
  mounted(){
      this.getInfo()
  }
}
</script>

<style scoped>
.instellingen .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
}

.instellingen .container-fluid>.row{
    min-height: 100vh;
}
.instellingen{
    min-height: 100vh;
}
.pagetitle{
    border-bottom: 1px solid orange;
    text-align: start;
}
.profile-block{
    padding: 15px;
    margin: 15px;
    width: 30%;
    text-align: start;
}
.inputrow{
    display: inline-flex;
    width: 100%;
}
.inputrow input{
   width: 50%;
}

.inputrow p{
   width: 50%;
   margin: 5px;
}
</style>