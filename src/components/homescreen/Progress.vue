<template>
  <div class="progressblock">
      <div class="progressSub" v-for="sub in filteredProgress" v-bind:key="sub.sId">
        {{sub.tName}} {{sub.oName}} {{sub.sName}}
        <b-progress :value="(sub.percentage_finished/sub.count)" :max="100" show-progress animated></b-progress>
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
      for(var item in this.progress){
        if(this.progress[item].training_id == 1){
          if(filteredProgress.length != 0){
            for(var subItem in filteredProgress){
              if(filteredProgress[subItem].onderdeel_id == this.progress[item].onderdeel_id){
                filteredProgress[subItem].count +=  1;
                filteredProgress[subItem].percentage_finished += this.progress[item].percentage_finished
                break;
              }
              else{
                if(subItem + 1 == filteredProgress.length){
                  var newitem = filteredProgress.length
                  filteredProgress.push(this.progress[item])
                  filteredProgress[newitem].count = 1;
                }
              }
            }
          }
          else{
            filteredProgress.push(this.progress[item])
            filteredProgress[0].count = 1;
          }
        }
      }
      console.log(filteredProgress)
      return filteredProgress;
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
