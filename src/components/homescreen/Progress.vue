<template>
  <div class="progressblock">
      <div class="progressSub" v-for="sub in filteredProgress" v-bind:key="sub.sId">
        {{sub.tName}} {{sub.oName}}
        <b-progress :value="sub.countFinish" :max="sub.count" show-progress animated></b-progress>
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
    this.getProgress();
 },
  data: function(){
    return{
      progress: []
    }
  },
 methods:{
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
			if(!progressId.includes(this.progress[item].training_id)){
				filteredProgress.push(this.progress[item])
				progressId.push(this.progress[item].training_id)
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
					++filteredProgress[progressId.indexOf(this.progress[item].training_id)].countFinish
					++filteredProgress[progressId.indexOf(this.progress[item].training_id)].count
				}
				else{
					++filteredProgress[progressId.indexOf(this.progress[item].training_id)].count				
				}
			}
			console.log(filteredProgress)
		}
		return filteredProgress
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
</style>
