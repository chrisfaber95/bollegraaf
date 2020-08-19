<template>
  <div class="voortgang">
    <Header />
    <div class="container-fluid">        
		<div class="title">
			<h2 class="pagetitle">Voortgang</h2>
			<hr>
		</div>
		<div class="progressblock">
			<div class="progressSub" v-for="sub in filteredProgress" v-bind:key="sub.sId">
				{{sub.tName}} {{sub.oName}}
				<b-progress :value="sub.countFinish" :max="sub.count" show-progress animated></b-progress>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js'
import Header from '@/components/general/Header.vue'

export default {
  name: 'HelloWorld',
  components: {
      Header
  },
  props: [
    'followed'
  ],
  mounted(){
    this.getProgress();
 },
  data: function(){
    return{
      progress: []
    }
  },
 methods:{
   imageUrl: function(pet){
     return require('@/assets/Afbeeldingen_vierkant/' + pet)
   },
   getProgress: function(){
     HTTP.get('progress/'+localStorage.id_token)
     .then(response =>{
       this.progress = response.data.progress
     })
   }
 },
 computed:{
    filteredProgress: function(){
		var filteredProgress = []
		var progressId = []
		for(var item in this.progress){
			if(!progressId.includes(this.progress[item].onderdeel_id)){
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
			else{
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
 }
}
</script>

<style scoped>
.voortgang .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
    display: block;
	padding: 3%;
}

.voortgang .container-fluid>.row{
    min-height: 100vh;
}
.voortgang{
    min-height: 100vh;
}
.pagetitle{
    border-bottom: 1px solid orange;
    text-align: start;
}
.voortgang-block{
    padding: 15px;
    margin: 15px;
    text-align: start;
    width: 50%;
}
</style>
