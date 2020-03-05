<template>
    <div class="trainingen">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Trainingen</h2>
        <div class="training-block" v-if="page=='tests'">
            <div class="eindtoetsen">
                <h3>Eindtoetsen</h3>
                <p>Er zijn eindtoetsen beschikbaar</p>
                <Eindtoetsitem :training="training1"/>
            </div>
        </div>
        <div class="training-block" v-if="page=='followed'">
           <div class="training" v-for="(training, index) in filteredGevolgd" v-bind:key="training.id" @click="showSub(training)">
                <font-awesome-icon icon="caret-right" /><b>{{index + 1}}. {{training.tName}}</b>
                <div class="trainingSub" v-for="(sub, index) in filterOnd(training.training_id)" v-bind:key="sub.oId">
                    <div class="line">
                        <div class="line-tekst">
                            <font-awesome-icon icon="caret-right" /><b>{{index + 1}}. {{sub.oName}}</b>
                        </div>
                    </div>
                    <div class="trainingSub" v-for="(sub, index) in filterSub(sub.onderdeel_id)" v-bind:key="sub.sId">
                        <div class="line">
                            <div class="line-tekst" v-if="sub.isVisible == 1">
                                <p>{{index + 1}}. {{sub.sName}}</p>
                                <router-link :to="'/trainingpage/'+index"><b-button class="start-btn">Start</b-button></router-link>
                            </div>
                            <div class="line-tekst" v-if="sub.isVisible == null">
                                <p>{{index + 1}}. {{sub.sName}}</p>
                                <router-link :to="'/trainingpage/'+sub.subonderdeel_id"><b-button class="stop-btn">Niet beschikbaar</b-button></router-link>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           
           <!-- <Trainingitem v-for="training in followed" v-bind:key="training.id" :training="training" :followed="true"/>
      -->  </div>
        <div class="training-block" v-if="page=='all'">
           <Trainingitem v-for="training in filteredTraining" v-bind:key="training.id" :training="training"/>
        </div>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/general/Header.vue'
import Eindtoetsitem from '@/components/Eindtoetsitem.vue'
import {HTTP} from '@/assets/scripts/http-common.js'
import Trainingitem from '@/components/Trainingitem.vue'

export default {
  name: 'Home',
  components: {
    Trainingitem,
    Header,
    Eindtoetsitem
  },
  props: [
      'page'
  ],
  data: function(){
    return{
      trainingen: [],
      followed: [],
    }
  },
  methods:{
    getTrainingen: function(){
      HTTP.get('training')
      .then(response =>{
        this.trainingen = response.data.training
      })
    },
    getFollowedTraining: function(){
        HTTP.get('training/user/'+localStorage.id_token)
        .then(response =>{
        this.followed = response.data.training
        })
    },
    filterSub: function(onderdeel){
            var filteredTraining = []
            for(var item in this.trainingen){
                if(this.trainingen[item].onderdeel_id == onderdeel){
                    filteredTraining.push(this.trainingen[item]);
                }
            }
        return filteredTraining;
    },
    filterOnd: function(onderdeel){
            var filteredTraining = []
            var idArr = []
            for(var item in this.trainingen){
                if(this.trainingen[item].training_id == onderdeel && !idArr.includes(this.trainingen[item].onderdeel_id)){
                    filteredTraining.push(this.trainingen[item]);
                    idArr.push(this.trainingen[item].onderdeel_id)
                }
            }
            console.log(filteredTraining)
        return filteredTraining;
    },
    showSub: function(training){
        if(training.show == true){
            training.show = false
        }
        else{
            training.show = true
        }
    }
  },
  created(){
    this.getTrainingen()
    this.getFollowedTraining()
  },
  computed: {
    filteredTraining: function(){
      return this.trainingen;
    },
    filteredGevolgd: function(){
      var filteredFollowed = []
      var idArr = []
      for(var item in this.trainingen){
        if(filteredFollowed.length == 0){
            filteredFollowed.push(this.trainingen[item])
            idArr.push(this.trainingen[item].training_id)
        }
        else if(!idArr.includes(this.trainingen[item].training_id)){
            filteredFollowed.push(this.trainingen[item])
            idArr.push(this.trainingen[item].training_id)
        }
      }
      console.log(filteredFollowed)
      return filteredFollowed
     // return this.followed;
    },
    newfilteredTraining: function(trainingId){
      var filteredTraining = []

      for(var item in this.trainingen){
          if(this.trainingen[item].trainingId == trainingId){
              filteredTraining = [];
          }
      }
      console.log(filteredTraining)
      return filteredTraining;
    }
  }
}
</script>

<style scoped>
.trainingen .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
    display: inline-flex;
}

.trainingen .container-fluid>.row{
    min-height: 100vh;
}
.trainingen{
    min-height: 100vh;
}
.pagetitle{
    border-bottom: 1px solid orange;
    text-align: start;
}
.training-block{
    padding: 0;
    margin: 15px;
    text-align: start;
    width: 50%;
    border:1px solid #999999;
    height: min-content;
}
.eindtoetsen{
    width: 40%;
}
.training{
    width: 100%;
}
.trainingSub{
    width:100%;
}
.line{
    border-bottom: 1px solid #999999;
}
.line-tekst{
    width:100%;
    display: inline-flex;
    margin: 10px;
    margin-left: 15px;
}
.line-tekst svg{
    margin:4px;
    color: green;
}
.line-tekst p{
    padding: 0;
    margin-bottom: 0;
    width: 30%;
}
.line-tekst .progressbar{
    padding: 0;
    margin-bottom: 0;
    width: 40%;
}
.start-btn{
    color:green;
    border: none;
    background: #ffffff;
    margin: 0;
    padding: 0;
    text-align: end;
    width: 25%;
}
.stop-btn{
    color:red;
    border: none;
    background: #ffffff;
    margin: 0;
    padding: 0;
    text-align: end;
    width: 25%;
}
.start-btn :hover{
    color:green;
    border: none;
    background: #ffffff;
    margin: 0;
    padding: 0;
    text-align: end;
    width: 25%;
}
</style>