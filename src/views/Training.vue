<template>
    <div class="trainingen">
    <Header />
    <div class="container-fluid">
		<div class="title">
			<h2 class="pagetitle">Mijn trainingen</h2>
			<hr>
		</div>
        <div class="training-block">
           <div class="training" v-for="(training, index) in filteredGevolgd" v-bind:key="training.training_id" @click="showSub(training)">
				<div class="trainingname">
					<font-awesome-icon icon="caret-right" /><b>{{index + 1}}. {{training.tName}}</b>
				</div>
				<div class="trainingSub onderdeel" v-for="(sub, index) in filterOnd(training.training_id)" 
					@click="selectedOnderdeel = sub.onderdeel_id; active_onderdeel  = 'onderdeel'+sub.onderdeel_id; closeActive('onderdeel'+sub.onderdeel_id)"
					v-bind:key="sub.oId">
					<div class="line"
						v-bind:class="{ 'active':  active_onderdeel  == 'onderdeel'+sub.onderdeel_id }">
						<div class="line-tekst">
							<font-awesome-icon icon="caret-right" /><b>{{index + 1}}. {{sub.oName}}</b>
						</div>
					</div>
					<div class="trainingSub subonderdeel" v-for="(sub, index) in filterSub(sub.onderdeel_id)"
						v-bind:key="sub.sId">
						<div class="line" v-if="selectedOnderdeel && selectedOnderdeel == sub.onderdeel_id && sub.isVisible == 1">
							<div class="line-tekst">
								<p>{{index + 1}}. {{sub.sName}}</p>
								<router-link :to="'/trainingpage/'+sub.subonderdeel_id"><b-button class="start-btn">Start</b-button></router-link>
							</div>
						<!--<div class="line-tekst" v-if="sub.isVisible == null || sub.isVisible == 0">
							<p>{{index + 1}}. {{sub.sName}}</p>
							<router-link :to="''"><b-button class="stop-btn">Niet beschikbaar</b-button></router-link>
						</div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/general/Header.vue'
//import Eindtoetsitem from '@/components/Eindtoetsitem.vue'
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'Home',
  components: {
    Header
  },
  props: [
  ],
  data: function(){
    return{
        trainingen: [],
        followed: [],
        selectedOnderdeel: null,
        active_onderdeel: null,
    }
  },
  methods:{
    getTrainingen: function(){
      HTTP.get('/training/user/'+localStorage.id_token)
        .then(response => {
        console.log(response.data)
        this.trainingen = response.data.training
        return response.data.training
        })
    },
    getFollowedTraining: function(){
        HTTP.get('training/user/'+localStorage.id_token)
        .then(response =>{
        this.followed = response.data.training
	console.log(this.followed)
        })
    },
    filterSub: function(onderdeel){	
         //   var filteredTraining = []
        //    for(var item in this.trainingen){
        //        if(this.trainingen[item].onderdeel_id == onderdeel){
        //            filteredTraining.push(this.trainingen[item]);
        //        }
        //    }
			
            var filtered = []
            var filteredIds = []
            for(var item in this.trainingen){
                if(this.trainingen[item].onderdeel_id == onderdeel){
                    if(!filteredIds.includes(this.trainingen[item].subonderdeel_id)){
                    filtered.push(this.trainingen[item])
                    filteredIds.push(this.trainingen[item].subonderdeel_id)
                    }
                
                }
            }
			console.log(filtered)
            return filtered
        


      //  return filteredTraining;
	},
	filterOnd: function(onderdeel){
		var filteredTraining = []
		var idArr = []
		for(var item in this.trainingen){
			if(this.trainingen[item].training_id == onderdeel && !idArr.includes(this.trainingen[item].onderdeel_id) && this.trainingen[item].isVisible == 1){
				filteredTraining.push(this.trainingen[item]);
				idArr.push(this.trainingen[item].onderdeel_id)
			}
		}
		console.log(filteredTraining)
		return filteredTraining;
	},
	showSub: function(training){
		if(training == true){
			training.show = false
		}
		else{
			training.show = true
		}
	},
	closeActive(active){
		console.log(active)
		console.log(this.active_onderdeel)
		if(this.active_onderdeel == active){
			this.active_onderdeel = null
			this.filterSub()
		}
		console.log(this.active_onderdeel)
	}
},
created(){
	this.getTrainingen()
	this.getFollowedTraining()
},
computed: {
	filteredTraining: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].training_id)){
				filtered.push(this.trainingen[item])
				filteredIds.push(this.trainingen[item].training_id)
			}
		}
		return filtered
        
		// return this.trainingen;
	},
	filteredGevolgd: function(){
		var filteredFollowed = []
		var idArr = []
		for(var item in this.trainingen){
			if(filteredFollowed.length == 0 && this.trainingen[item].isVisible == 1){
				filteredFollowed.push(this.trainingen[item])
				idArr.push(this.trainingen[item].training_id)
			}
			else if(!idArr.includes(this.trainingen[item].training_id) && this.trainingen[item].isVisible == 1){
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
    display: block;
	padding: 3%;
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
.line-tekst:hover{
	cursor: pointer;
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
hr{
		
}
.title{
	width: 100%;	
}
.trainingname{
	padding: 5px;	
}
.trainingname svg{
	font-size: 1.5em;
	width: 1em;
}
</style>