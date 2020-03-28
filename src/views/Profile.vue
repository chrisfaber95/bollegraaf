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
            <p>Nog geen behaalde certificaten</p>
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

export default {
  name: 'Home',
  components: {
      Header
  },
  data: function(){
    return{
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
    }
  },
  created(){
  },
  mounted(){
      auth.getInfo();
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