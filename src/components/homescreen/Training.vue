<template>
	<div class="training row">
		<div class="trainingimg">
			<img class="img-fluid" :src="imageUrl(training.tImage)"/>
		</div>
		<div class="infotext">			
			<div class="row">
				<div class="col-lg-6">
					<span><b>Training:</b> {{training.tName}}</span>
					<hr>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6">
					<p><b>Trainingsprogramma:</b> {{training.tName}}</p>
					<p><b>Onderdeel:</b> {{training.oName}}</p>
					<p><b>Training:</b> {{training.sName}}</p>
					<p><b>Tijdsduur:</b> {{training.time}}</p>
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
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'HelloWorld',
  props: [
    'training'
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
		console.log
		if(pet != '' || pet != ' ' || pet != null){
			return require('@/assets/Afbeeldingen_vierkant/afbeelding_pers.jpg')
		}
		else{
			return require('@/assets/Afbeeldingen_vierkant/' + pet)			
		}
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
     HTTP.get('training/user/'+localStorage.id_token)
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
		var filtered = []
		var filteredIds = []
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].training_id)){
				filtered.push(this.trainingen[item])
				filteredIds.push(this.trainingen[item].training_id)
			}
		}
		return filtered
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
hr{
}
.training{
	background-color: #fafafa;	
}
.trainingimg{
    max-width:25%;
    height: 100%;
    overflow: hidden;
}
.training.row{
    border:1px solid #333333;
    width:95%;
    display: inline-flex;
    margin: 10px 0;
}
.training .infotext{
    width:75%;
    padding: 10px;
}
.start-btn .btn{
	background-color: #96BF31;
}
.start-btn .btn:hover{
	background-color: #203780;
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
