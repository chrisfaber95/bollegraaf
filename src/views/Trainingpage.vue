/* eslint-disable */
<template>
    <div class="training">
		<div class="header">
			<Header />
            <div class="title">
             <h2> Training: </h2>
            </div>
        </div>
        <div id="training-block">
          <div class="test-block">
              <carousel 
                :per-page="1" 
                :mouse-drag="false" 
                paginationColor='#000000'
                paginationActiveColor="#999999"
                paginationPosition= "bottom"
				:paginationEnabled="false"
				id="infoSlider"
				ref="carousel"
                >
              <slide class="editors" v-for="item in filteredTrainingen" v-bind:key="'info'+item.iId">
                <div v-html="item.iText"></div>
              </slide>				  
              <slide class="editors">
                <div v-html="lastInfopage"></div>
              </slide>
              <slide class="editors" v-for="item in filteredQuestions" v-bind:key="'questions'+item.iId">
                <div v-html="item"></div>
              </slide>	
              </carousel>
          </div>
          <div class="footer">
            <router-link :to="'/'"><b-button id="afsluiten-btn">Afsluiten</b-button></router-link>
            <b-button id="help-btn">Help</b-button>
            <div id="training-btn" v-for="item in filteredTrainingen" v-bind:key="'page'+item.iPage">
             <p>-</p>
            </div>
            <div id="test-btn">
              <p>Test block block block</p>
            </div>
            <div class="changePage-btn">
              <b-button id="vorige-btn" @click="prevSlide()">Vorige</b-button>
              <b-button id="volgende-btn" @click="nextSlide()">Volgende</b-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
import Header from '@/components/general/Header.vue';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'HelloWorld',
  components:{
		Carousel,
		Slide,
		Header
  },
  props: [
  ],
  data: function(){
    return{
		onderdeel_id: null,
		training: null,
		lastInfopage:"De volgende pagina's zijn de oefeningen over de gelezen informatie",
		questions: []
    }
  },
  methods:{
    getTraining: function(){
      console.log(this.$route)
       HTTP.get('information/'+this.$route.params.training) 
      .then(response =>{
        this.training = response.data.info
        console.log(this.training)
      })
    },
	getTests: function(){
		HTTP.get('/questions/'+this.$route.params.training)
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question
			return this.questions
		})
	},
	nextSlide() {
		this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
		console.log(this.$refs.carousel.getNextPage())
    },
    prevSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
    }
  },
  mounted(){
    this.getTraining()
    this.getTests()
 },
 computed:{
     filteredTrainingen: function(){
       var filtered = [];
       for(var item in this.training){
         if(this.training[item].page != 0){
           filtered.push(this.training[item])
         }
       }
       return filtered
	},
	filteredQuestions: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.questions){
			if(!filteredIds.includes(this.questions[item].question_id)){
				filtered.push(this.questions[item])
				filteredIds.push(this.questions[item].question_id)
			}
		}
       console.log(filtered)
         return filtered
     }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
    width:13vw;
    max-height:2vw;
}
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
.header h2{
    text-align: center;
}

.header{
  height: 13vh;
}
#training-block{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  height: 87vh;
}
.footer{
  display: inline-flex;
  height: 10%;
  width: 100%;
  background-color: #333333;
   color: #ffffff;
}
.footer button{
  height: 50%;
}
.test-block{
  height: 90%;
  text-align: left;
  padding:30px;
}
.changePage-btn{
  width:20%;
}

.VueCarousel {
    height: 90%;
}
</style>
<style>
	#infoSlider .VueCarousel-wrapper {
    overflow-y: scroll;
	height: 95%;
}
</style>