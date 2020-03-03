<template>
  <div class="training row">
      <div class="followed" v-if="followed == 'true'">
        <div class="traininginfo"  v-for="training in filteredTraining" v-bind:key="training.sId">
            <div class="trainingimg">
              <img class="img-fluid" :src="imageUrl(training.tImage)">
            </div>
            <div class="infotext">
              <span>Training: {{training.tName}}</span>
              <hr>
              <div class="row">
                  <div class="col-lg-6">
                      <p>Trainingsprogramma:{{training.tName}}</p>
                      <p>Onderdeel: {{training.oName}}</p>
                      <p>Training: {{training.sName}}</p>
                      <p>Tijdsduur: {{training.time}}</p>
                  </div>
                  <div class="col-lg-6">
                      <span>Inhoud van deze training</span>
                      <p></p>
                  </div>
              </div>
              <div class="row">
                <div class="col-lg-8">
                  <b-progress :value="training.percentage_finished" :max="100" show-progress animated></b-progress>
                </div>
                <div class="col-lg-4 start-btn">
                  <b-button class="">Hervat training</b-button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class='notfollowed' v-if="followed == 'false'">
        <div class="traininginfo"  v-for="training in filteredNotSubbedTraining" v-bind:key="training.sId">
            <div class="trainingimg">
              <img class="img-fluid" :src="imageUrl(training.tImage)">
            </div>
            <div class="infotext">
              <span>Training: {{training.tName}} niet gevolgd</span>
              <hr>
              <div class="row">
                  <div class="col-lg-6">
                      <p>Onderdelen: {{training.tName}}</p>
                      <p>Trainingen: {{training.tName}}</p>
                      <p>Tijdsduur: {{training.tName}}</p>
                      <p>Eindtoets: 1</p>
                  </div>
                  <div class="col-lg-6">
                      <span>Inhoud van deze training</span>
                      <p>..........</p>
                  </div>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'HelloWorld',
  props: [
    'followed'
  ],
  mounted(){
    if(this.followed == "true"){
     this.getTraining();
    }
    else{
      this.getAllTraining();
    }
    console.log(this);
 //   this.countSubs();
 },
  data: function(){
    return{
      followed_trainingen: [],
      trainingen: []
    }
  },
 methods:{
   imageUrl: function(pet){
     return require('@/assets/Afbeeldingen_vierkant/' + pet)
   },
   countSubs: function(){
   //  if(this.$props.training.lastSubonderdeel){
     // HTTP.get('training/onderdeel/'+this.$props.training.oId)
     // .then(response =>{
    //    console.log(response)
    //  })
    // }
   },
   getTraining: function(){
     HTTP.get('training/user/'+localStorage.id_token)
     .then(response =>{
       console.log(response)
       this.followed_trainingen = response.data.training
     })
   },
   getAllTraining: function(){
     HTTP.get('training/')
     .then(response =>{
       console.log(response)
       this.trainingen = response.data.training
     })
   }
 },
 computed:{
    filteredTraining: function(){

      var lockedNumber =[];
      for(var item in this.followed_trainingen){
        if(this.followed_trainingen[item].percentage_finished != 100){
          lockedNumber.push(this.followed_trainingen[item])
        }
        if(lockedNumber.length == 2){
          break;
        }
      }
      return lockedNumber;
    },
    filteredNotSubbedTraining: function(){
      return this.trainingen;
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
.training{
    margin-bottom: 20px;
    text-align: left;
}
.trainingimg{
    max-width:25%;
    height: 100%;
    overflow: hidden;
}
.traininginfo{
    border:1px solid #333333;
    width:95%;
    display: inline-flex;
    margin: 10px 0;
}
.traininginfo .infotext{
    width:75%;
    padding: 10px;
}
.start-btn{
  padding-bottom: 10px;
}
p{
  margin-bottom: 2px;
}
@media only screen and (max-width:750px){
  .trainingimg{
      max-width:25%;
      height: 100%;
      overflow: hidden;
      text-align: right;
  }
}
</style>
