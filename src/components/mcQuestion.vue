<template>
	<div class="question">
		<b-button id="save-btn" @click="saveAnswers(questionId)" :disabled="checked_answers">{{$t("training.controleren")}}</b-button>
		<div class="row answer" v-for="(question, index) in filteredAnswers" v-bind:key="index">
			<b-form-checkbox
				v-model="given_answers[index]"
				name="checkbox-1"
				@change="answerChanged(index)"
				class="answer_check"
			></b-form-checkbox><p v-bind:class="{ correct: checked_answers && (question.correct_answer == given_answers[index] && question.correct_answer != 'false'), wrong: checked_answers && question.correct_answer != given_answers[index]}" v-html="question.answer_text"></p> 
		</div>		
	</div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'HelloWorld',
  props: [
    'questionId',
	'page'
  ],
  data: function(){
    return{
		questions: [],
		starting_answer: [],
		answers: [],
		given_answers: [],
		correct_answer: 0,
		current_question: null,
		checked_answers: false
    }
  },
 methods:{
	getQuestion: function(){
		console.log(this.questionId)
		HTTP.get('/questions/single/'+this.questionId)
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question
			return this.questions
		})
	},
	answerChanged: function(index){
		console.log(index)
		if(this.given_answers[index] == true){
			this.given_answers[index] = false
		}
		else{
			this.given_answers[index] = true
		}
		console.log(this.given_answers)
	},
	saveAnswers: function(quest){
		//var correct = 0
		this.correct_answer = 0
		var question = this.filteredAnswers
		for(var item in question){
			if(this.given_answers[item] == true){
				this.given_answers[item] = "true"
			}
			else if(this.given_answers[item] == false || this.given_answers[item] == null){
				this.given_answers[item] = "false"
			}
			console.log(this.given_answers)
			if(question[item].correct_answer == this.given_answers[item]){
				console.log("correct")
				this.correct_answer += 1
			}
			else{
				console.log("niet correct")
			}
		}
		this.checked_answers = true;
		var data= {
			question_id: quest,
			correct_answers: this.correct_answer,
			date: new Date(),
			possible_answers: question.length
		}
		console.log(this.page.summary.part)
		console.log(this.page.summary)
		if(question.length != this.correct_answer && this.correct_answer != 0){
			++this.page.summary.part
		}
		else if(this.correct_answer == 0){
			++this.page.summary.wrong
		}
		else if(question.length == this.correct_answer){
			++this.page.summary.correct
		}
		++this.page.summary.amount
		HTTP.post('/progress/'+localStorage.id_token, data)
		.then(response => {
			console.log(response.data)
		})
	}
 },
  mounted(){
    this.getQuestion()
 },
	computed:{
	filteredAnswers: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.questions){
			if(!filteredIds.includes(this.questions[item].multiAnswer_id) && this.questions[item].multiAnswer_id != null){
				filtered.push(this.questions[item])
				filteredIds.push(this.questions[item].multiAnswer_id)
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
    margin-bottom: 20px;
    text-align: left;
}
.trainingimg{
    max-width:25%;
    height: 100%;
    overflow: hidden;
}
.traininginfo{
  padding: 0 10px;
    width:75%;
}
.start-btn{
  padding-bottom: 10px;
}
p{
  margin-bottom: 2px;
}
.answer{
	margin: 15px;	
}
.answer .active{
	background-color: #345464 !important;
}
.correct{
	color: green;
}
.wrong{
	color: red;
}
</style>
