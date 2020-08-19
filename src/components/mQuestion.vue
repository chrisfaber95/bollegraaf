<template>
	<div class="question"> 
		<b-button id="save-btn" @click="saveAnswers(questionId)" :disabled="checked_answers">{{$t("training.controleren")}}</b-button>
		<table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col" v-if="checked_answers">{{$t("training.correctanswer")}}</th>
          </tr>
        </thead>
        <draggable v-model="given_answers" tag="tbody">
          <tr v-for="(item, index) in given_answers" :key="item.multiAnswer_id">
            <td scope="row"><p v-html="filteredAnswers[index].answer_text"></p></td>
            <td class="move"><p v-bind:class="{ correct: checked_answers && given_answers[index].correct, wrong: checked_answers && !given_answers[index].correct}" v-html="given_answers[index].correct_answer"></p></td>
            <td v-if="checked_answers"><p v-html="filteredAnswers[index].correct_answer"></p></td>
          </tr>
        </draggable>
      </table>	  
	</div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js'
import draggable from 'vuedraggable'

export default {
  name: 'HelloWorld',
  components:{
		draggable
  },
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
		editable: true,
		isDragging: false,
		delayedDragging: false,
		checked_answers: false,
		dragging: false
    }
  },
 methods:{
	orderList: function() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
	onMove: function({ relatedContext, draggedContext }) {
		const relatedElement = relatedContext.element;
		const draggedElement = draggedContext.element;
		return (
			(!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
		);
	},
	getQuestion: function(){
		console.log(this.questionId)
		HTTP.get('/questions/single/'+this.questionId)
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question	
			this.shuffleAnswers()
			return this.questions
		})
	},
	onChangeMQuestion: function(evt){
		console.log(evt)
		console.log(this.info)
		for(var item in this.info){
			this.info[item].iPage = item
			this.saveInformation(this.info[item])
		}		
		return true;
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
	shuffleAnswers: function(){
		this.given_answers = this.questions.map((x) => x)
		let i = this.given_answers.length;		
		console.log(this.given_answers)
		while (i--) {
			const ri = Math.floor(Math.random() * (i + 1));
			[this.given_answers[i], this.given_answers[ri]] = [this.given_answers[ri], this.given_answers[i]];
		}
		console.log(this.given_answers)
	},
	saveAnswers: function(quest){
		//var correct = 0
		this.correct_answer = 0
		var question = this.given_answers
		for(var item in question){
			if(this.given_answers[item] == this.filteredAnswers[item]){
				console.log("correct")
				console.log(this.given_answers[item])
				console.log(this.filteredAnswers[item])
				this.given_answers[item].correct = true
				
				this.correct_answer = this.correct_answer + 1
			}
			else if(this.given_answers[item] != this.filteredAnswers[item]){
				this.given_answers[item].correct = false
				console.log("niet correct")
				console.log(this.given_answers[item])
				console.log(this.filteredAnswers[item])
			}
		}
		this.checked_answers = true;
		var data= {
			question_id: quest,
			correct_answers: this.correct_answer,
			date: new Date(),
			possible_answers: this.given_answers.length
		}
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
		console.log(data)
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
	dragOptions: function() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
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
     },
	filteredGiven_answers: function(){
		var filtered = []
			var filteredIds = []
			for(var item in this.given_answers){
				if(!filteredIds.includes(this.given_answers[item].multiAnswer_id) && this.given_answers[item].multiAnswer_id != null){
					filtered.push(this.given_answers[item])
					filteredIds.push(this.given_answers[item].multiAnswer_id)
				}
			}
		console.log(filtered)
		return filtered
	}
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
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
	
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.ans{
	border: 1px solid #ececec;	
}
.answers .col-md-1{
	margin: 0;
	padding: 5px;
}
.answers .col-md-9{
	margin: 0;
	padding: 5px;
}
.correct{
	color: green;
}
.wrong{
	color: red;
}
.ans {
	height: 100%;
}
.move{
	cursor: pointer;
}
</style>
