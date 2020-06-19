<template>
  <div class="trainingQuestion">
	<div class="col-1">
		<b-button  v-b-modal.modal-newquestion class="bewerk-btn">Vraag toevoegen</b-button>
	</div>
	<div class="row" v-for="question in filteredQuestions" v-bind:key="question.question_id">
		<div class="col-1">
			{{question.question_id}}
		</div>
		<div class="col-7">
			<div v-html="question.question_text"></div>
		</div>
		<div class="col-2">
			<b-button  v-b-modal.modal-question class="bewerk-btn" @click="changeQuestion(question.question_id)">Open vraag</b-button>
		</div>
		<div class="col-2">		
			<b-button @click="deleteQuestion(question.question_id)">Verwijder vraag</b-button>
		</div>
	</div>

	<b-modal id="modal-question" size="xl" hide-footer hide-header v-if="selectedQuestion">
		<div class="d-block">
			<p>Vraag:</p>{{filteredQuestionAnswers[0].question_text}}
			<p>Antwoorden:</p>
			<div class="row" v-for="(question, index) in filteredQuestionAnswers" v-bind:key="index">
				{{question.answer_text}} - {{question.correct_answer}}
			</div>
		</div>
		<div class="buttons">
			<b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
		</div>
	</b-modal>
	<b-modal id="modal-newquestion" size="xl" hide-footer hide-header>
		<div class="d-block">
			<div class="row">
				<div class="col-6">
					<select v-model="newQuestion.language_id">
						<option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
					</select>
				</div>
				<b-form-group id="input-group-2" label="Quetiontype:" label-for="input-1">
					<b-form-select
						type="text" 
						name="question"
						v-model="newQuestiontype" 
						id= "input-2"
					>
						<b-form-select-option value="null">Please select a questiontype</b-form-select-option>
						<b-form-select-option value="tf">True/False</b-form-select-option>
						<b-form-select-option value="mc">Multiple Choice</b-form-select-option>
						<b-form-select-option value="dd" disabled>Drag & Drop</b-form-select-option>
						<b-form-select-option value="m">Match</b-form-select-option>
					</b-form-select>				
				</b-form-group>
				<div v-if="newQuestion.type == 'tf' || newQuestion.type == 'mc'">
					<b-form-group id="input-group-2" label="Question:" label-for="input-1">
						<ckeditor :editor="editor" v-model="newQuestion.questionText" :config="editorConfig"></ckeditor>
						<!--<b-form-input
							type="text" 
							name="questiontext"
							v-model="newQuestion.questionText"
							id= "input-3"
							value=""
						>
						</b-form-input>-->				
					</b-form-group>
					<b-form-group id="input-group-2" label="Antwoorden:" label-for="input-2">
						<div class="answers" v-for="(item, index) in newQuestion.answers" v-bind:key="index">
							<b-form-input
								type="text" 
								name="answer_text"
								v-model="item.text"
								value=""
								@change="item.value = item.text"
							>
							</b-form-input>										
						</div>
						{{newQuestion.answers}}
						<b-form-checkbox-group
							id="checkbox-group-1"
							v-model="newQuestion.correct_answer"
							:options="newQuestion.answers"
							name="flavour-1"
						></b-form-checkbox-group>
						{{newQuestion.correct_answer}}
						<b-button v-if="newQuestion.type == 'mc' || newQuestion.type == 'm'" @click="extraAnswer">Voeg extra antwoord mogelijkheid toe</b-button>
					</b-form-group>
				</div>
				
				<div v-if="newQuestion.type == 'm'">
					<b-form-group id="input-group-2" label="Question:" label-for="input-1">
						<ckeditor :editor="editor" v-model="newQuestion.questionText" :config="editorConfig"></ckeditor>			
					</b-form-group>
					<b-form-group id="input-group-2" label="Antwoorden:" label-for="input-2">
						<div class="row answers" v-for="(item, index) in newQuestion.answers" v-bind:key="index">
							<div class="col-6">
								<b-form-input
									type="text" 
									name="answer_text"
									v-model="item.text"
									value=""
									@change="item.value = item.text"
								>
								</b-form-input>
							</div>
							<div class="col-6">
								<b-form-input
									type="text" 
									name="correct_answer"
									v-model="newQuestion.correct_answer[index]"
									value=""
								>
								</b-form-input>
							</div>
						</div>
						<b-button v-if="newQuestion.type == 'mc' || newQuestion.type == 'm'" @click="extraAnswer">Voeg extra antwoord mogelijkheid toe</b-button>
					</b-form-group>
				</div>		
			</div>
		</div>
		<div class="buttons">
			<b-button class="mt-3" block @click="addQuestion()">Vraag opslaan</b-button>
			<b-button class="mt-3" block @click="closenewModal()">Sluiten</b-button>
		</div>
	</b-modal>
</div>
</template>

<script>
//import { Carousel, Slide } from 'vue-carousel';
import {HTTP} from '@/assets/scripts/http-common.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ShowInfo from '@/components/admin/showInformation.vue';
//import ClassicEditor from '@/assets/ckeditor-own/src/ckeditor.js';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
//import ClassicEditor from '@ckeditor/ckeditor5-own';
//import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
//import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
//import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
	
//import draggable from 'vuedraggable'
	
export default {
  name: 'HelloWorld',
  props: [
	'setting',
	'selectedSub'
  ],
  components:{
//    Carousel,
//    Slide,
//	draggable,
//	ShowInfo
  },
data: function(){
	return{
//		selectedSub: null,
        editor: ClassicEditor,
        editorConfig: {// The configuration of the editor.			
		},
        editorData: '',
		questions: [],
		newQuestion:{
			questionText: "",
			type: "null",
			answers: [],
			language_id: 1,
			correct_answer: []
		},
		newQuestiontype: "null",
		correct_answer: [],
        selectedQuestion: null,
        language: null
	}
},
methods:{
      closeModal: function(){
        this.$bvModal.hide('modal-question')
      },
      closenewModal: function(){
        this.$bvModal.hide('modal-newquestion')
      },
	getQuestions: function(){
		HTTP.get('/questions/' + this.selectedSub)
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question
			return this.questions
		})
	},
	addQuestion: function(){
		var data = {
			subId: this.selectedSub,
			question: this.newQuestion
		}
		console.log(data)
		HTTP.post('/questions', data)
		.then(response => {
			console.log(response.data)
		this.questions = response.data
	//		console.log(this.questions)
			return this.questions
		})
		this.getQuestions()
		this.closenewModal()
	},
	deleteQuestion:function(qId){
		alert(qId)
		HTTP.delete('/questions/'+qId)
		.then(response => {
            console.log(response.data)
			alert(response.data.message)
			this.getQuestions()
		})
	},
	changeQuestion: function(sub){
		this.selectedQuestion = sub
	},
	changeQuestionInput: function(){
		this.newQuestion.type = this.newQuestiontype
		if(this.newQuestion.type == 'tf'){
			this.newQuestion.answers = [{
				text: 'true',
				value: 'true'
			},
			{
				text: 'false',
				value: 'false'
			}
			]
		}
		else if(this.newQuestion.type == 'mc' || this.newQuestion.type == 'm'){
			this.extraAnswer()
		}
		console.log(this.newQuestion.answers)
	},
	extraAnswer: function(){
		var answer = {
			text: '',
			value: '',
		}
		this.newQuestion.answers.push(answer)
	},
	changeCorrectAnswer: function(){
		console.log(this.correct_answer)
		for(var item in this.newQuestion.answers){
			this.newQuestionAnswers[item].correct_answer = 	this.correct_answer
		}
	},
	getLanguage: function(){
		HTTP.get('settings/language/')
		.then(response => {
			this.language = response.data.language
			console.log(this.language)
			return this.language
		})
	}
},
mounted(){
	this.getQuestions()
	this.getLanguage()
	
},
computed:{
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
	},
     filteredLanguage: function(){
         return this.language
     },
	filteredQuestionAnswers: function(){
		var filtered = []
		for(var item in this.questions){
			if(this.questions[item].question_id == this.selectedQuestion){
				filtered.push(this.questions[item])
			}
		}
		console.log(filtered)
		return filtered
	}
},
watch:{
	trainingen: function(){
		console.log("trainingen added");
	},
	newQuestiontype: function(){
		this.changeQuestionInput()	
	},
	correct_answer:function(){
		this.changeCorrectAnswer()
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
}
.training h2{
    padding: 15px;
}
.trainingimg{
    width:30%;
    height: 100%;
    overflow: hidden;
}
.trainingimg img{
    max-width: 170%
}
.traininginfo{
    width:70%;
}
.start-btn{
  padding-bottom: 10px;
}

#selection .btn{
  padding: 5px;
  font-size: 1.3rem;
  margin: 10px;
}
#selection .col-2{
  display: inline-flex;
}
.modal .modal-dialog.modal-xxl {
    max-width: 95vw !important;
    height: 95vh;
}

#modal-3 .modal-body{
  height: 95vh;
}
#modal-3 .modal-body .d-block{
  height: 88vh;
}
#selection .btn{
  background-color: #0040f0;
}

#selection .btn.active{
  background-color: green;
}
#selection .title .btn{
  background-color: #888888;
  font-size: 0.8rem;

}
#selection .title h3{
  display: inline;

}
#selection .title{
  padding-top: 20px;
  padding-left: 10px;
}
	
#selection{
  padding: 10px;
}
</style>