<template>
  <div class="voortgang">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Voortgang</h2>
        <div class="progressblock">
            <div class="progressSub" v-for="sub in filteredProgress" v-bind:key="sub.sId">
            {{sub.tName}} {{sub.oName}} {{sub.sName}} ---- {{sub.user_id}}
            <b-progress :value="sub.percentage_finished" :max="100" show-progress animated></b-progress>
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
       if(JSON.parse(localStorage.getItem('userinfo').permission_id != 1)){
            HTTP.get('progress/'+localStorage.id_token)
            .then(response =>{
            this.progress = response.data.progress
            })
       }
       else{
           HTTP.get('progress/')
            .then(response =>{
            this.progress = response.data.progress
            })
       }
       
   }
 },
 computed:{
    filteredProgress: function(){
  /*    var filteredProgress = []
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
      return filteredProgress;*/
      console.log(this.progress)
      return this.progress
    }
 }
}
</script>

<style scoped>
.voortgang .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
    display: inline-flex;
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