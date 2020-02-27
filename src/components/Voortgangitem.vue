<template>
  <div class="voortgang">
    <div class="training" v-for="(training) in filteredTraining" v-bind:key="training.id">
        <h5>Trainingsprogramma {{training[0].tName}}</h5>
        <b>Onderdelen:</b>

        <div class="voortgangbalk">
            <div class="progressbar">
              <b-progress :value="percentage_finished" :max="100" show-progress animated></b-progress>
            </div>
        </div>
               <div class="line">
                    <div class="line-tekst">
                        <font-awesome-icon icon="caret-right" /><b>{{training.oName}}</b>
                    </div>
               </div>
               <div>
                <div class="trainingSub" v-for="(sub) in training" v-bind:key="sub.sId">
                    <div class="line">
                        <div class="line-tekst">
                            <p>{{sub.oName}} {{sub.sName}}</p>
                          <div class="progressbar">
                            <b-progress :value="getProgress(training, sub.oId)" :max="100" show-progress animated></b-progress>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
           </div>
  </div>
</template>

<script>
import {HTTP} from '@/components/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
  ],
  data: function(){
    return{
      trainingen: [],
      followed: [],
      
    }
  },
  methods:{
    getFollowedTraining: function(){
      HTTP.get('user/'+localStorage.getItem('id_token')+'/training')
      .then(response =>{
        this.followed = response.data.training;
        console.log(this.followed)
      })
    },
    filterSub: function(onderdeel){
        console.log(onderdeel);
        const filteredOnderdeel = []
        for(var item in this.followed){
            console.log
            if(this.followed[item].oId == onderdeel){
                if(filteredOnderdeel.length == 0){
                    filteredOnderdeel.push(this.followed[item]);
                }
                else if(this.followed[item].sId != filteredOnderdeel[filteredOnderdeel.length - 1].sId){
                    filteredOnderdeel.push(this.followed[item]);
                }
            }
        }
      console.log(filteredOnderdeel)
        return filteredOnderdeel;
    },
    getProgress: function(training, id){
      var progress = 0;
      var counter = 0;
        console.log(training)
      for(var i in training){
        
        console.log(i)
        if(training[i].oId == id){
          counter = counter + 1;
          progress = progress + training[i].percentage_finished
          
        }
      }
      return (progress/100*counter)
    }
  },
  created(){
    this.getFollowedTraining()
  },
  computed: {
    percentage_finished: function(){
     const percentage = 0
      return percentage;
    },
    filteredTraining: function(){
      const filteredTraining = []
      for(var item in this.followed){
        var id = this.followed[item].tId -1
        if(!(id in filteredTraining)){
          filteredTraining[id] = [];
          filteredTraining[id].push(this.followed[item]);
        }
        else{
          filteredTraining[id].push(this.followed[item])
        }
      }
      console.log(filteredTraining)
      return filteredTraining
     // return this.followed;
    },
    filteredGevolgd: function(){
      const filteredFollowed = []
      const idArr = []
      for(var item in this.followed){
        if(filteredFollowed.length == 0){
            filteredFollowed.push(this.followed[item])
            idArr.push(this.followed[item].tId)
        }
        else if(!idArr.includes(this.followed[item].tId)){
            filteredFollowed.push(this.followed[item])
            idArr.push(this.followed[item].tId)
        }
      }
      console.log(filteredFollowed)
      return filteredFollowed
     // return this.followed;
    }

  },
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
}
.trainingimg{
    width:30%;
    height: 100%;
}
.trainingimg img{
    height: 100%;
}
.traininginfo{
    width:70%;
}
</style>
