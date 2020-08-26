/* eslint-disable */
<template>
    <div class="training">
		<div class="header">
			<Header ref="head"/>
            <div class="title">
             <h2>{{ $t("training.training") }}:</h2>
            </div>
			<!--<b-button  v-b-modal.modal-question class="bewerk-btn" @click="getInfoRefPage(question)">Bewerk</b-button>-->
        </div>
        <div id="training-block">
          <div class="test-block" ref="scroller">
              <div class="slider">
				<div class="info" v-if="currentSetting == 'info'">
					<div class="editors" v-for="item in filteredTrainingen" v-bind:key="'info'+item.iId">
						<div class="page" v-if="currentPage == item.iPage">
							<h1>{{item.iTitle}}</h1>
							<hr/>
							<div v-html="item.iText"></div>
						</div>
					</div>
				</div>
				<div class="info" v-if="currentSetting == 'info' && currentPage == filteredTrainingen.length + 1">
					<div class="editors">
						<h1 v-if="filteredTrainingen.length != 0" >{{lastInfoTitle}}</h1>
						<hr/>
						<div v-if="filteredTrainingen.length != 0"  class="lastinfo" v-html="lastInfopage"></div>
						<div v-if="filteredTrainingen.length == 0"  class="lastinfo" v-html="nolanguageinfo"></div>
					</div>
				</div>
				<div class="info" v-if="currentSetting == 'vragen'">
					<div class="editors" ref="questionslides" v-for="(item, index) in filteredQuestions" v-bind:key="'questions'+item.question_id">
						<div class="page" v-if="currentPage == index">
							<p>Vraag:</p><div v-html="item.question_text"> </div>
							<br/>
							<div class="mc" v-if="item.questiontype == 'tf'">
								<mcquestion v-bind:page="trainingpage" v-bind:questionId="item.question_id"></mcquestion>						
							</div>
							<div class="mc" v-if="item.questiontype == 'mc'">
								<mcquestion v-bind:page="trainingpage" v-bind:questionId="item.question_id"></mcquestion>						
							</div>
							<div class="m" v-if="item.questiontype == 'm'">
								<mquestion v-bind:page="trainingpage" v-bind:questionId="item.question_id"></mquestion>
							</div>
							<div class="dd" v-if="item.questiontype == 'dd'">
								<ddquestion v-bind:page="trainingpage" v-bind:questionId="item.question_id"></ddquestion>
							</div>
						</div>
					</div>
				</div>
              <div class="editors"  v-if="currentSetting == 'vragen'  && currentPage == filteredQuestions.length">
					<h1>{{ $t("training.results") }}</h1>
					<hr/>
					<div class="row overzicht">
						<div class="col-12" id="summary">
							<h4>{{ $t("training.summary") }}:</h4>
						</div>
						<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12" id="score">
							<span><b>{{ $t("training.score") }}:</b></span>
							<span><b>{{ $t("training.mark") }}:{{computedScore}}</b></span>
							<span><b>{{ $t("training.outcome") }}:</b></span>
						</div>
						<div class="col-xl-3 col-lg-3 col-md-9 col-sm-9 col-xs-9" id="questioncount">
						<span>	<b>{{ $t("training.amount") }} {{ $t("training.questions1") }}:</b></span>
							<span><b>{{ $t("training.amount") }} {{ $t("training.correct") }}:</b></span>
							<span><b>{{ $t("training.amount") }} {{ $t("training.partcorrect") }}:</b></span>
							<span><b>{{ $t("training.amount") }} {{ $t("training.wrong") }}:</b></span>
							<span><b>{{ $t("training.amount") }} {{ $t("training.notanswered") }}:</b></span>
						</div>
						<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1" id="questioncounter">
						<span>{{summary.amount}}</span>
							<span>{{summary.correct}}</span>
							<span>{{summary.part}}</span>
							<span>{{summary.wrong}}</span>
							<span>{{summary.no_answer}}</span>
						</div>
					</div>
              </div>	
              </div>
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
				<div class="left-btn">
					<router-link :to="'/'"><b-button id="afsluiten-btn">{{ $t("training.quit") }}</b-button></router-link>
					<b-button id="help-btn">{{ $t("training.help") }}</b-button>
				</div>
				<div class="indicatorrow" id="info-indicator">
					<p>{{ $t("training.training") }}</p>
					<div class="training-btn page-indicator" ref="indicators" v-for="item in filteredTrainingen" v-bind:key="'page'+item.iPage">
					</div>
				</div>
				<div class="indicatorrow" id="question-indicator">						
					<p>{{ $t("training.questions") }}</p>
					<div class="training-btn page-indicator" ref="indicators1" v-for="item in filteredQuestions" v-bind:key="'questionind'+item.question_id">
					</div>
				</div>
				<div class="right-btn">
					<b-button id="vorige-btn" @click="prevSlide()" v-if="!finished">{{ $t("training.previous") }}</b-button>
					<b-button id="volgende-btn" @click="nextSlide()" v-if="!finished">{{ $t("training.next") }}</b-button>
					<router-link :to="{ name: 'Training'}" tag="link"><b-button id="afrond-btn" @click="afronden()" v-if="finished">{{ $t("training.complete") }}</b-button></router-link>
				</div>
			</div>
        </div>
    </div>
	<!--<b-modal id="modal-question" size="xl" hide-footer hide-header v-if="selectedRef">
		<div class="d-block">
			
		</div>
		<div class="buttons">
			<b-button class="mt-3" block @click="saveEditQuestion(filteredQuestionAnswers)">Opslaan</b-button>
			<b-button class="mt-3" block @click="$bvModal.hide('modal-question')">Sluiten</b-button>
		</div>
	</b-modal>-->
	</div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
import Header from '@/components/general/Header.vue';
//import { Carousel, Slide } from 'vue-carousel';
//import draggable from 'vuedraggable'
import mquestion from '@/components/mQuestion.vue';
import mcquestion from '@/components/mcQuestion.vue';
import ddquestion from '@/components/ddQuestion.vue';
import auth from '@/assets/scripts/auth';

export default {
  name: 'HelloWorld',
  components:{
//		Carousel,
//		Slide,
		Header,	  
	//	draggable,
		mquestion,
		mcquestion,
		ddquestion
  },
  props: [
  ],
  data: function(){
    return{
		onderdeel_id: null,
		training: null,
		lastInfopage:"Je hebt net alle informatie bekeken over de werking van de machine.<br/><br/>Nu komen er een aantal vragen over de informatie die je net hebt bekeken. Aan het einde van de toets krijg je direct de uitslag. Met de uitslag kun je zien welke vragen je goed, gedeeltelijk goed of fout hebt beantwoord.",
		lastInfoTitle:"Instructie toets",
		nolanguageinfo: "There is no current information available in the language, change your language in the menu bar.",
		questions: [],
		summary:{
			amount: 0,
			correct: 0,
			part: 0,
			wrong: 0,
			no_answer: 0
		},
		starting_answer: [],
		finished: false,
		trainingpage: this,
		currentPage: 1,
		currentSetting: 'info',
		sub: null
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
	getSub: function(){
		HTTP.get('/training/subonderdeel/single/'+this.$route.params.training+'/user/'+auth.getId())
		.then(response => {
			console.log(response.data)
			this.sub = response.data.training[0]
			return response.data.training
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
	afronden: function(){
		var data = {
			subId: this.$route.params.training
		}
		console.log(data)
		HTTP.put('/progress/'+localStorage.id_token, data)
		.then(response => {
			console.log(response.data)
		})
	},
	nextSlide() {
		if(this.currentPage == this.filteredTrainingen.length + 1 && this.currentSetting == 'info'){
			//this.$refs.indicators[this.currentPage].classList.add('pageDone')
			this.currentPage = 0
			this.currentSetting = 'vragen'
		}
		else if(this.currentPage == this.filteredTrainingen.length && this.currentSetting == 'info'){
			this.$refs.indicators[this.currentPage-1].classList.add('pageDone')
			this.currentPage = this.currentPage + 1
		}
		else if(this.currentPage < this.filteredTrainingen.length && this.currentSetting == 'info'){
			this.$refs.indicators[this.currentPage-1].classList.add('pageDone')
			this.$refs.scroller.scrollTop = 0
			this.currentPage = this.currentPage + 1
		}
		else if(this.currentPage < this.filteredQuestions.length && this.currentSetting == 'vragen'){
			this.$refs.indicators1[this.currentPage].classList.add('pageDone')
			this.$refs.scroller.scrollTop = 0
			this.currentPage = this.currentPage + 1
		}
		else if(this.currentPage == this.filteredQuestions.length && this.currentSetting == 'vragen'){
			//this.$refs.indicators1[this.currentPage].classList.add('pageDone')
			this.$refs.scroller.scrollTop = 0
			this.finished = true
		}		
    },
    prevSlide() {
		if(this.currentPage != 0){
			this.$refs.scroller.scrollTop = 0
			this.currentPage = this.currentPage - 1 
		}
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
	this.getSub()
    this.getTests()
	this.changeVideo()
	document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
 },
 computed:{
     filteredTrainingen: function(){
       var filtered = [];
		console.log(this.$refs.head)
		for(var item in this.training){
		if(this.training[item].page != 0 && this.training[item].language_id  == this.$refs.head.language_id){
			console.log(this.training)
			filtered.push(this.training[item])
         }
       }
		console.log(filtered)
		return filtered
	},
	filteredQuestions: function(){
		var filtered = []
		var filteredIds = []
		var dif = []
		if(this.sub != null){
		console.log(this.sub)
			dif = this.sub.difficulty.split('')
		}
		if(window.matchMedia("(max-width: 767px)").matches){
			for(var j in this.questions){
				if(this.questions[j].questiontype == 'dd'){
					this.$delete(this.questions,j)
				}
			}
		}
		let i = this.questions.length;
		while (i--) {
			const ri = Math.floor(Math.random() * (i + 1));
			[this.questions[i], this.questions[ri]] = [this.questions[ri], this.questions[i]];
		}
		
		for(var item in this.questions){
		console.log(dif.includes(this.questions[item].difficulty.toString()))
			if(dif.length != 0){
				if(!filteredIds.includes(this.questions[item].question_id) && this.questions[item].language_id == this.$refs.head.language_id && dif.includes(this.questions[item].difficulty.toString())){
					filtered.push(this.questions[item])
					filteredIds.push(this.questions[item].question_id)
				}
				if(filtered.length == 3){
					break;	
				}
			}
			else{
				if(!filteredIds.includes(this.questions[item].question_id) && this.questions[item].language_id == this.$refs.head.language_id && this.questions[item].difficulty == 0){
					filtered.push(this.questions[item])
					filteredIds.push(this.questions[item].question_id)
				}
				if(filtered.length == 3){
					break;	
				}
			}
		}
       console.log(filtered)
         return filtered
     },
	computedScore: function(){
		var score = 0
		score = ((((this.summary.correct * 1) + (this.summary.part *0.5)) / this.summary.amount) * 10)		 
		return score;
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
  overflow-y: scroll;
}
	
.training-btn{
	margin: 5px;
    background: grey;
    width: 1.6rem;
    height: 1rem;	
}

.page-indicator{
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
#afrond-btn{
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
.overzicht{
	background-color: #ececec;
}
.overzicht #summary{
	background-color: #96BF31;
	color: #ffffff;
}
.overzicht #score span{
	display: block;
}
.overzicht #questioncount span{
	display: block;
}
.overzicht #questioncounter span{
	display: block;
}
.title h2{
	color: white;
}
.indicatorrow{
	margin-top: auto;
}

@media only screen and (max-width: 1440px) {
.footer .row {
    margin-left: 10px;
	margin-right: 10px;
  }
}
.page{
	height:100%;
}
#infoSlider .VueCarousel-wrapper {
	overflow-y: scroll;
	height: 100%;
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .VueCarousel-slide {
    padding: 2%;
	width: 100%;
}


@media only screen and (max-width: 425px) {
.table table tbody tr {
	display: grid;
  }
}
</style>
<style>
	#infoSlider .VueCarousel-wrapper {
    overflow-y: scroll;
	height: 100%;
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .VueCarousel-slide {
    padding: 2%;
	width: 100%;
}

#infoSlider .VueCarousel-wrapper .VueCarousel-inner img {
	width: 100%;
	max-width: 100%;
}

#infoSlider .VueCarousel-wrapper .VueCarousel-inner .image-style-align-left {
    float: left;
    margin-right: var(--ck-image-style-spacing);
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .image-style-align-center {
    margin-left: auto;
    margin-right: auto;
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .image-style-align-right {
    float: right;
    margin-left: var(--ck-image-style-spacing);
}
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .media {
	width: 100%;
	max-width: 100%;
}

#infoSlider .VueCarousel-wrapper .VueCarousel-inner .media iframe {
	width: 100% !important;
	max-width: 560px !important;
	max-height: 315px !important;
}

@media only screen and (max-width: 425px) {
#infoSlider .VueCarousel-wrapper .VueCarousel-inner .table table tbody tr {
	display: grid;
  }
}

.image img{
	width: 100%;
	max-width: 100%;
}

.image-style-align-left {
    float: left;
    margin-right: var(--ck-image-style-spacing);
}
.image-style-align-center {
    margin-left: auto;
    margin-right: auto;
}
.image-style-align-right {
    float: right;
    margin-left: var(--ck-image-style-spacing);
}
.media {
	width: 100%;
	max-width: 100%;
}

.media iframe {
	width: 100% !important;
	max-width: 560px !important;
	max-height: 315px !important;
}
</style>