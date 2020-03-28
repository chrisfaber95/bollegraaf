<template>
  <div class="home">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7">
          <div class="trainingfollow">
            <h3>Mijn trainingen</h3>
            <hr>
            <Training followed="true"/>
            <router-link :to="{ name: 'Training', params: {page: 'followed' }}" :tag="link">Bekijk al mijn trainingen</router-link>
          </div>
          <div class="trainingall">
            <h3>Alle trainingen</h3>
            <hr>
            <Training followed="false"  :amount="all"/>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="voortgang">
            <h3>Mijn voortgang</h3>
            <Progress />
            <p>Bekijk de hele voortgang</p>
          </div>
          <div class="Eindtoetsen">
            <h3>Eindtoetsen</h3>
            <p>Er zijn eindtoetsen beschikbaar</p>
            <Quiz/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Training from '@/components/homescreen/Training.vue'
import Progress from '@/components/homescreen/Progress.vue'
import Quiz from '@/components/homescreen/Quiz.vue'
import Header from '@/components/general/Header.vue'
import {HTTP} from '@/assets/scripts/http-common.js';

export default {
  name: 'Home',
  components: {
    Training,
    Progress,
    Quiz,
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
  .col-lg-7, .col-lg-5{
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