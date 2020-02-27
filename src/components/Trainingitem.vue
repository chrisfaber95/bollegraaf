<template>
  <div class="training row">
        <div class="trainingimg">
            <img class="img-fluid" :src="imageUrl(training.tImage)">
        </div>
        <div class="traininginfo" v-if=followed>
            <span>Training: {{training.tName}}</span>
            <hr>
            <div class="row">
                <div class="col-6">
                    <p>Trainingsprogramma: {{training.tName}}</p>
                    <p>Onderdeel: {{training.oName}}</p>
                    <p>Training: {{training.sName}}</p>
                    <p>Tijdsduur: {{training.oTime}}</p>
                </div>
                <div class="col-6">
                    <span>Inhoud van deze training</span>
                    <p>............</p>
                </div>
            </div>
            <div class="row">
              <div class="col-8">
                <b-progress :value="training.percentage_finished" :max="100" show-progress animated></b-progress>
              </div>
              <div class="col-4 start-btn">
                <b-button class="">Hervat training</b-button> 
              </div>
            </div>
        </div>
        <div class="traininginfo" v-if=!followed>
            <span>Training: {{training.tName}} niet gevolgd</span>
            <hr>
            <div class="row">
                <div class="col-6">
                    <p>Onderdelen: {{training.oCount}}</p>
                    <p>Trainingen: {{training.sCount}}</p>
                    <p>Tijdsduur: {{training.tTime}}</p>
                    <p>Eindtoets: 1</p>
                </div>
                <div class="col-6">
                    <span>Inhoud van deze training</span>
                    <p>..........</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {HTTP} from '@/components/http-common.js'

export default {
  name: 'HelloWorld',
  props: [
    'training',
    'followed',
    'subs'
  ],
  mounted(){
    this.countSubs();
 },
 methods:{
   imageUrl: function(pet){
     return require('../assets/Afbeeldingen_vierkant/' + pet)
   },
   countSubs: function(){
     if(this.$props.training.lastSubonderdeel){
      HTTP.get('training/onderdeel/'+this.$props.training.oId)
      .then(response =>{
        console.log(response)
      })
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
.training{
    border:1px solid #333333;
    margin-bottom: 20px;
    text-align: left;
}
.trainingimg{
    max-width:25%;
    height: 100%;
    overflow: hidden;
}
.traininginfo{
  padding: 0 10px;
    width:75%;
}
.start-btn{
  padding-bottom: 10px;
}
p{
  margin-bottom: 2px;
}
</style>
