<template>
	<div class="training row" ref="block">
		<div class="trainingimg">
			<img class="img-fluid" v-if="first_sub.tImage" :src="imageUrl(first_sub.tImage)"/>
			<img class="img-fluid" v-if="!first_sub.tImage" :src="imageUrl('')"/>
		</div>
		<div class="infotext">			
			<div class="row">
				<div class="col-lg-6">
					<span><b>{{ $t("trainingblock.training") }}:</b> {{first_sub.tName}}</span>
					<hr>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6">
					<p><b>{{ $t("trainingblock.program") }}:</b> {{first_sub.tName}}</p>
					<p><b>{{ $t("trainingblock.subject") }}:</b> {{first_sub.oName}}</p>
					<p><b>{{ $t("trainingblock.section") }}:</b> {{first_sub.sName}}</p>
				</div>
				<div class="col-lg-6">
					<!--<span>Inhoud van deze training</span>
					<p></p>-->
				</div>
			</div>
			<div class="row">
				<div class="col-lg-8">
					<b-progress :value="finished" :max="followed_trainingen.length" show-progress animated></b-progress>
				</div>
				<div class="col-lg-4 start-btn">
					<router-link :to="'/trainingpage/'+first_sub.subonderdeel_id"><b-button class="start-btn">{{ $t("trainingblock.continue") }}</b-button></router-link>
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
     this.getTraining();
 },
  data: function(){
    return{
		followed_trainingen: [],
		trainingen: [],
		finished: 0,
		first_sub: null
    }
  },
methods:{
	imageUrl: function(pet){
		console.log(pet)
		if(pet == '' || pet == ' ' || pet == null){
			return require('@/assets/Afbeeldingen_vierkant/afbeelding_pers.jpg')
		}
		else{
			return require('@/assets/Afbeeldingen_vierkant/' + pet)			
		}
   },
   getTraining: function(){
	console.log(this.training)
     HTTP.get('training/single/'+this.training.training_id+'/user/'+localStorage.id_token)
     .then(response =>{
       console.log(response)
		var filtered = []
		var filteredIds = []
		this.finished = 0
		for(var item in response.data.training){
			if(response.data.training[item].isVisible){
				filtered.push(response.data.training[item])
				filteredIds.push(response.data.training[item].subonderdeel_id)
				if(this.first_sub == null && response.data.training[item].isFinished == 0){
					this.first_sub  = response.data.training[item]	
				}
				if(response.data.training[item].isFinished == 1){
					++this.finished
				}
				console.log(this.first_sub, this.finished)
			}
		}
		console.log(filtered)
       this.followed_trainingen = filtered
		if(this.followed_trainingen.length == this.finished){
			this.$refs.block.classList.add('finished')
		}
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
        if(this.followed_trainingen[item].isFinished != 100){
          lockedNumber.push(this.followed_trainingen[item])
        }
        if(lockedNumber.length == 2){
          break;
        }
      }
      return lockedNumber;
    },
	subCount: function(){
		console.log(this.followed_trainingen.length)
		return this.followed_trainingen.length + 1
	},
	finishedCount:function(){
		var finished = []
		for(var item in this.followed_trainingen){
			if(this.followed_trainingen[item].isFinished){
				finished.push(this.followed_trainingen[item])
			}
		}
		return finished.length
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
.finished{
	display: none;	
}
</style>
