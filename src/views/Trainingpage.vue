/* eslint-disable */
<template>
    <div class="training">
		<div class="header">
			<Header />
            <div class="title">
             <h2> Training: </h2>
            </div>
			<!--<b-button  v-b-modal.modal-question class="bewerk-btn" @click="getInfoRefPage(question)">Bewerk</b-button>-->
        </div>
        <div id="training-block">
          <div class="test-block">
              <carousel
				v-bind:mouseDrag=false 
                :per-page="1"
                paginationColor='#000000'
                paginationActiveColor="#999999"
                paginationPosition= "bottom"
				:paginationEnabled="false"
				id="infoSlider"
				ref="carousel"
                >
				<slide class="editors" v-for="item in filteredTrainingen" v-bind:key="'info'+item.iId">
					<h1>{{item.iTitle}}</h1>
					<hr/>
					<div v-html="item.iText"></div>
				</slide>				  
              <slide class="editors">
					<h1>{{lastInfoTitle}}</h1>
					<hr/>
					<div class="lastinfo" v-html="lastInfopage"></div>
              </slide>
              <slide class="editors" v-for="item in filteredQuestions" v-bind:key="'questions'+item.question_id">
				<p>Vraag:</p><div v-html="item.question_text"> </div>
					<br/>
					<div class="mc" v-if="item.questiontype == 'mc'">
						<mcquestion v-bind:questionId="item.question_id"></mcquestion>						
					</div>
					<div class="m" v-if="item.questiontype == 'm'">
						<mquestion v-bind:questionId="item.question_id"></mquestion>
					</div>
              </slide>	
              </carousel>
		</div>
			<div id="modal-extra" class="modal">
				<div class="modal-content">
					<span class="close" @click="closeModal()">&times;</span>
					<!--<div v-html="infoRefPage.iText"></div>-->
					<p>test</p>
				</div>
			</div>
		<div class="footer">
			<div class="row">
				<div class="col-2">
					<router-link :to="'/'"><b-button id="afsluiten-btn">Afsluiten</b-button></router-link>
					<b-button id="help-btn">Help</b-button>
				</div>
				<div class="col-8">
					<p>Training</p>
					<div class="training-btn" ref="indicators" v-for="item in filteredTrainingen" v-bind:key="'page'+item.iPage">
						<p class="page-indicator">-</p>
					</div>
					<div id="test-btn">
						<p>Test block block block</p>
					</div>
				</div>
				<div class="col-2">
					<b-button id="vorige-btn" @click="prevSlide()">Vorige</b-button>
					<b-button id="volgende-btn" @click="nextSlide()">Volgende</b-button>
				</div>
			</div>
        </div>
    </div>
	</div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
import Header from '@/components/general/Header.vue';
import { Carousel, Slide } from 'vue-carousel';
//import draggable from 'vuedraggable'
import mquestion from '@/components/mQuestion.vue';
import mcquestion from '@/components/mcQuestion.vue';

export default {
  name: 'HelloWorld',
  components:{
		Carousel,
		Slide,
		Header,	  
	//	draggable,
		mquestion,
		mcquestion
  },
  props: [
  ],
  data: function(){
    return{
		onderdeel_id: null,
		training: null,
		lastInfopage:"Je hebt net alle informatie bekeken over de werking van de machine.<br/><br/>Nu komen er een aantal vragen over de informatie die je net hebt bekeken. Aan het einde van de toets krijg je direct de uitslag. Met de uitslag kun je zien welke vragen je goed, gedeeltelijk goed of fout hebt beantwoord.",
		lastInfoTitle:"Instructie toets",
		questions: [],
		starting_answer: [],
		answers: [],
		given_answers: [],
		correct_answer: 0,
		current_question: null,
    }
  },
  methods:{
    getTraining: function(){
      console.log(this.$route)
       HTTP.get('information/'+this.$route.params.training) 
      .then(response =>{
        this.training = response.data.info
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
		console.log(this.$refs.indicators.length)
		console.log(this.$refs.carousel.currentPage)
		if(this.$refs.carousel.currentPage < this.$refs.indicators.length){
			this.$refs.indicators[this.$refs.carousel.currentPage].firstChild.classList.add('pageDone')
		}
		this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
		console.log(this.$refs.carousel.getNextPage())
    },
    prevSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
    },
	changeVideo: function(){
		var element = document.getElementsByClassName("media");
	console.log(element)
		//If it isn't "undefined" and it isn't "null", then it exists.
		if(typeof(element) != 'undefined' && element != null){
			[].slice.call( element ).forEach(function ( div ) {
				console.log(div)
			});
		} else{
			alert('Element does not exist!');
		}	
	},
	openModal: function(){
		alert("test");
		var modal = document.getElementById("modal-extra");
		modal.style.display = "block";
	},
	closeModal: function(){
		var modal = document.getElementById("modal-extra");
		modal.style.display = "none";
	}
  },
  mounted(){
    this.getTraining()
    this.getTests()
	this.changeVideo()
	document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
 },
 computed:{
     filteredTrainingen: function(){
       var filtered = [];
       for(var item in this.training){
         if(this.training[item].page != 0){
			console.log(this.training)
			filtered.push(this.training[item])
         }
       }
       return filtered
	},
	filteredQuestions: function(){
		var filtered = []
		var filteredIds = []
		
		let i = this.questions.length;
		while (i--) {
			const ri = Math.floor(Math.random() * (i + 1));
			[this.questions[i], this.questions[ri]] = [this.questions[ri], this.questions[i]];
		}
		
		for(var item in this.questions){
			if(!filteredIds.includes(this.questions[item].question_id)){
				filtered.push(this.questions[item])
				filteredIds.push(this.questions[item].question_id)
			}
			if(filtered.length == 3){
				break;	
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
  display: block;
  height: 7%;
  width: 100%;
  background-color: #333333;
   color: #ffffff;
}
.footer .row > div{
	display: inline-flex;
}
	
.test-block{
  height: 93%;
  text-align: left;
  padding:30px;
}
	
.training-btn{
	margin: 10px;		
}

.page-indicator{
	margin: 5px;	
    background: grey;
    width: 2rem;
}
.pageActive{
	background-color: orange;
}

.pageDone{
	background-color: #96BF31;		
}
	
.VueCarousel {
    height: 90%;
}

#afsluiten-btn{
	background-color: #203780;
	margin: 10px;
}
	
	
#afsluiten-btn:hover{
	background-color: #96BF31;
}
#help-btn{
	background-color: #203780;
	margin: 10px;
}

	
#help-btn:hover{
	background-color: #96BF31;
}
#vorige-btn{
	margin: 10px;
}
#volgende-btn{
	margin: 10px;
}
	
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}	
	
.btn{
	background-color: #96BF31;
}
.btn:hover{
	background-color: #203780;
}
.lastinfo{
	width: 40%	;
}
.media iframe{
	width: 100%;
	height: auto;
}
</style>
<style>
	#infoSlider .VueCarousel-wrapper {
    overflow-y: scroll;
	height: 100%;
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .VueCarousel-slide {
    padding: 2%;
}	
</style>