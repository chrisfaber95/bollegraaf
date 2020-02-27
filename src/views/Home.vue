<template>
  <div class="home">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-7">
          <div class="trainingfollow">
            <h3>Mijn trainingen</h3>
            <hr>
            <Trainingitem v-for="training in filteredGevolgd" v-bind:key="training.id" :training="training" :followed="true"/>
            <router-link :to="{ name: 'Trainingen', params: {page: 'followed' }}" :tag="link">Bekijk al mijn trainingen</router-link>
          </div>
          <div class="trainingall">
            <h3>Alle trainingen</h3>
            <hr>
            <Trainingitem v-for="training in filteredTraining" v-bind:key="training.id" :training="training" :followed="false"/>
          </div>
        </div>
        <div class="col-5">
          <div class="voortgang">
            <h3>Mijn voortgang</h3>
            <Voortgangitem />
            <p>Bekijk de hele voortgang</p>
          </div>
          <div class="Eindtoetsen">
            <h3>Eindtoetsen</h3>
            <p>Er zijn eindtoetsen beschikbaar</p>
            <Eindtoetsitem :training="training1"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Trainingitem from '@/components/Trainingitem.vue'
import Voortgangitem from '@/components/Voortgangitem.vue'
import Eindtoetsitem from '@/components/Eindtoetsitem.vue'
import Header from '@/components/Header.vue'
import {HTTP} from '@/components/http-common.js';

export default {
  name: 'Home',
  components: {
    Trainingitem,
    Voortgangitem,
    Eindtoetsitem,
    Header
  },
  data: function(){
    return{
      trainingen: [],
      followed: [],
      training1: "pers"
    }
  },
  methods:{
    getTrainingen: function(){
      HTTP.get('training')
      .then(response =>{
        this.trainingen = response.data.training
        console.log(this.trainingen);
      })
    },
    getFollowedTraining: function(){
      HTTP.get('user/'+localStorage.getItem('id_token')+'/training')
      .then(response =>{
        this.followed = response.data.training;
        console.log(this.followed)
      })
    }
  },
  created(){
    this.getTrainingen()
    this.getFollowedTraining()
  },
  computed: {
    filteredTraining: function(){
      return this.trainingen;
    },
    filteredGevolgd: function(){
      const filteredFollowed = []
      for(var item in this.followed){
          if(this.followed[item].percentage_finished != null && this.followed[item].percentage_finished != 100){
            filteredFollowed.push(this.followed[item]);
            break;
          }
      }
      console.log(filteredFollowed)
      return filteredFollowed
     // return this.followed;
    }

  },
}
</script>

<style scoped>
  .home{
    min-height: 100vh;
    text-align: left;
  }
  .home .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
  }
  .col-7, .col-5{
    padding-left: 40px;
    padding-right: 40px;
  }
  .trainingfollow, .trainingall{
    border-bottom: 1px solid rgba(33,33,33, 0.2);
    margin-bottom: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .trainingfollow > a{
    padding: 10px 0;
  }
</style>