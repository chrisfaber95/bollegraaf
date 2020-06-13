<template>
  <div class="training">
        <h2>Training</h2>
         <div v-if="setting=='list'">
            <div class="row" id="selection">
                <div class="col-3">
					<b-form-group id="input-group-1" label="Training:" label-for="input-1">
						<b-form-select
							type="text" 
							name="training"
							:options="filteredTrainingen"
							v-model="selectedTraining" 
							@change="selectedOnderdeel = null; active_onderdeel = null; active_training  = 'training'+selectedTraining.value"
							id= "input-1"
						></b-form-select>
					</b-form-group>
					<div class="row">
						<div class="col-6">
							<b-input type="text" value="" v-model="newTraining" placeholder="Nieuwe Training"/>
						</div>
						<div class="col-6">							
							<b-button @click="addTraining(newTraining)">Voeg toe</b-button>
						</div>
					</div>
					<div class="row">
						<div class="col-12">							
							<b-button @click="removeTraining()">Verwijder geselecteerde training</b-button>
						</div>
					</div>
                </div>
                <div class="col-3" v-if="selectedTraining">
					<b-form-group id="input-group-2" label="Onderdeel:" label-for="input-2">
						<b-form-select
							type="text" 
							name="onderdeel"
							:options="filteredOnderdeel"
							v-model="selectedOnderdeel" 
							@change="selectedSub = null; active_sub = null; active_onderdeel = 'onderdeel'+selectedOnderdeel.value"
							id= "input-2"
						></b-form-select>
					</b-form-group>
					<div class="row">
						<div class="col-6">
							<b-input type="text" v-model="newOnderdeel" placeholder="Nieuwe Onderdeel"/>
						</div>
						<div class="col-6">							
							<b-button @click="addOnderdeel(newOnderdeel, selectedTraining)">Voeg toe</b-button>
						</div>
					<div class="row">
						<div class="col-12">							
							<b-button @click="removeOnderdeel()">Verwijder geselecteerde onderdeel</b-button>
						</div>
					</div>
					</div>
					
                </div>
                <div class="col-3" v-if="selectedOnderdeel">
					<b-form-group id="input-group-3" label="Subonderdeel:" label-for="input-3">
						<b-form-select
							type="text" 
							name="subonderdeel"
							:options="filteredSub"
							v-model="selectedSub" 
							@change="getInformation(); getQuestions(); active_sub = 'subonderdeel'+selectedSub.value"
							id= "input-3"
						></b-form-select>
					</b-form-group>
					<div class="row">
						<div class="col-6">
							<b-input type="text" v-model="newSubonderdeel" placeholder="Nieuwe Subonderdeel"/>
						</div>
						<div class="col-6">							
							<b-button @click="addSubonderdeel(newSubonderdeel, selectedOnderdeel)">Voeg toe</b-button>
						</div>
					</div>
					<div class="row">
						<div class="col-12">							
							<b-button @click="removeSubonderdeel()">Verwijder geselecteerde subonderdeel</b-button>
						</div>
					</div>
                </div>

            </div>
			<div class="col-12" v-if="selectedSub">
				<toggle-switch
				:options="myOptions"
				v-model="infoSwitch"
				v-on:click="getQuestions(selectedSub.value)"
				/>
                 <!--   <Texteditor ref="editor" :text="selectedInformation[0].iText"/> -->
				<ShowInfo class="info" v-bind:selectedSub="selectedSub" v-if="infoSwitch == 'Info'"></ShowInfo>
				<ShowQuestion class="info" v-bind:selectedSub="selectedSub" v-if="infoSwitch == 'Vragen'"></ShowQuestion>
			</div>
		</div>
	</div>
</template>

<script>
//import { Carousel, Slide } from 'vue-carousel';
import {HTTP} from '@/assets/scripts/http-common.js'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ShowInfo from '@/components/admin/showInformation.vue';
import ShowQuestion from '@/components/admin/showQuestion.vue';
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
    'setting'
  ],
  components:{
//    Carousel,
//    Slide,
//	draggable,
	ShowInfo,
	ShowQuestion
  },
data: function(){
	return{
        trainingen: [],
        selectedTraining: null,
        selectedOnderdeel: null,
        selectedSub: null,
        info: [{
          sId: 0,
          iPage: 0,
          iId: 0,
          iText: '',
			language_id: 0
        }],
		referention: [],
		selectedRef: null,
		newRef:{
			opened: 0,
			subId: 0,
			refText: ''
		},
        pageEdit: 0,
 //      editor: ClassicEditor,
  //      editorConfig: {// The configuration of the editor.			
//		},
//        editorData: '',
        active_training: null,
        active_onderdeel: null,
        active_sub: null,
        newOnderdeel: null,
        newSubonderdeel: null,
        newTraining: null,
		questions: [],
        selectedQuestion: null,
		infoSwitch: "",
		newQuestion: "",
		newQuestiontype: null,
		newQuestionAnswers: [],
		correct_answer: null,
		questiontype: "null",
		myOptions: {
			layout: {
				color: 'black',
				backgroundColor: 'lightgray',
				selectedColor: 'white',
				selectedBackgroundColor: '#96BF31',
				borderColor: 'black',
				fontFamily: 'Arial',
				fontWeight: 'normal',
				fontWeightSelected: 'bold',
				squareCorners: false,
				noBorder: false
			},
			size: {
				fontSize: 1.3,
				height: 3.3,
				width: 15
			},
			items: {
				delay: .4,
				preSelected: 'Info',
				disabled: false,
				labels: [
					{name: 'Info', color: 'white', backgroundColor: '#96BF31'}, 
					{name: 'Vragen', color: 'white', backgroundColor: '#203780'}
				]
			}
		},	
        language: null
	}
},
methods:{
      getTrainingen: function(){
          HTTP.get('training')
          .then(response => {
            console.log(response.data)
            this.trainingen = response.data.training
            return this.trainingen
          })
      },
      getSelectedTraining: function(training){
        console.log(training)
          HTTP.get('training/'+training+'/onderdeel')
          .then(response => {
            console.log(response.data)
            this.selectedTraining = response.data.onderdeel
            return response.data.onderdeel
          })
      },
      getInformation: function(){
		console.log(this.selectedSub)
		this.info=[{
			sId: this.selectedSub,
			iPage: 0,
			iId: 0,
			iText: '',
			language_id: 1
		}]
		HTTP.get('information/'+this.selectedSub)
		.then(response => {
			console.log(response.data.info)
			for(var item in response.data.info){
				this.info.push(response.data.info[item])
			}
		})
      },
      saveInformation: function(info){
       // info.iText = this.$refs.editor.getEditorText();
        console.log(info)
          HTTP.put('information/update/'+info.iId, info)
          .then(response => {
            console.log(response.data)
			alert(response.data.message)
          })
      },
      updatePage: function(edit){
        console.log(this.pageEdit);
        console.log(edit)
        this.info[edit].iPage = this.pageEdit;
      },
      deleteInformation: function(iId){
        HTTP.delete('information/'+iId)
          .then(response => {
            console.log(response.data)
			alert(response.data.message)
			this.getInformation()
          })
      },
	getReferentions: function(){
		HTTP.get('referentions')
		.then(response => {
			console.log(response.data)
			this.referentions = response.data.referention
		})		
	},
      closeModal: function(){
        this.$bvModal.hide('modal-3')
      },
      changeSubonderdeel: function(sub){
          this.selectedSub = sub
      },
      addTraining: function(training){
		if(training != null){
			var data = []
			data.push(training) 
			HTTP.post('training/', data)
			.then(response => {
				console.log(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen trainingnaam ingevuld")  
		}
      },
	removeTraining: function(){
		if(this.selectedTraining != null){
			HTTP.delete('training/' + this.selectedTraining)
			.then(response => {
				console.log(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen training geselecteerd")  
		}
	},
	addOnderdeel: function(onderdeel, selected){
		if(onderdeel != null){
			var data = []
			data.push(onderdeel) 
			HTTP.post('training/onderdeel/'+selected, data)
			.then(response => {
				console.log(response.data)
				alert(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen onderdeelnaam ingevuld")  
		}
	},
	removeOnderdeel: function(){
		if(this.selectedOnderdeel != null){
			HTTP.delete('training/onderdeel/' + this.selectedOnderdeel)
			.then(response => {
				console.log(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen onderdeel geselecteerd")  
		}
	},
	addSubonderdeel: function(sub, selected){
		if(sub != null){
			var data = []
			data.push(sub) 
			HTTP.post('training/subonderdeel/'+selected, data)
			.then(response => {
				console.log(response.data)
				alert(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen subonderdeelnaam ingevuld")  
		}
	},
	removeSubonderdeel: function(){
		if(this.selectedSub != null){
			HTTP.delete('training/subonderdeel/' + this.selectedSub)
			.then(response => {
				console.log(response.data)
				this.getTrainingen()
			})
		}
		else{
			alert("Geen onderdeel geselecteerd")  
		}
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
			type: this.questiontype,
			questionText: this.newQuestion,
			answers: this.newQuestionAnswers
		}
		console.log(data)
		HTTP.post('/questions', data)
		.then(response => {
			console.log(response.data)
		//	this.questions = response.data
		//	console.log(this.questions)
			return this.questions
		})
	},	
//	closeModal: function(){
//		this.$bvModal.hide('modal-question')
	//},
	changeQuestion: function(sub){
		this.selectedQuestion = sub
	},
	onChange: function(evt){
		console.log(evt)
		console.log(this.info)
		for(var item in this.info){
			this.info[item].iPage = item
			this.saveInformation(this.info[item])
		}		
		return true;
	},
	changeQuestionInput: function(){
		if(this.questiontype == 'tf'){
			this.newQuestionAnswers = [{
				answer_text: 'true',
				correct_answer: null
			},
			{
				answer_text: 'false',
				correct_answer: null
			}
			]
		}
		else if(this.questiontype == 'mc' || this.questiontype == 'm'){
			this.extraAnswer()
		}
		console.log(this.newQuestionAnswers)
	},
	extraAnswer: function(){
		var answer = {
			answer_text: '',
			correct_answer: '',
		}
		this.newQuestionAnswers.push(answer)
	},
	changeCorrectAnswer: function(){
		console.log(this.correct_answer)
		for(var item in this.newQuestionAnswers){
			this.newQuestionAnswers[item].correct_answer = 	this.correct_answer
		}
	},
	addTrainingRef: function(info){
	console.log(info)
		this.newRef.opened = info
		console.log(this.newRef)
		HTTP.post('/referentions', this.newRef)
		.then(response => {
			console.log(response.data)
		//	this.questions = response.data
		//	console.log(this.questions)
			return true
		})
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
	this.getTrainingen();
	this.getReferentions()
	this.getLanguage()
	
},
computed:{
	filteredTrainingen: function(){
		var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een training"})
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].training_id)){
				filtered.push({'value': this.trainingen[item].training_id, 'text': this.trainingen[item].tName})
				filteredIds.push(this.trainingen[item].training_id)
			}
		}
		console.log(filtered)
		return filtered
	},
	filteredOnderdeel: function(){
		var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een onderdeel"})
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].onderdeel_id) && this.trainingen[item].training_id == this.selectedTraining){
				filtered.push({'value': this.trainingen[item].onderdeel_id, 'text': this.trainingen[item].oName})
				filteredIds.push(this.trainingen[item].onderdeel_id)
			}
		}
		console.log(filtered)
		return filtered
	},
	filteredSub: function(){
		var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een subonderdeel"})
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].subonderdeel_id) && this.trainingen[item].onderdeel_id == this.selectedOnderdeel){
				filtered.push({'value': this.trainingen[item].subonderdeel_id, 'text': this.trainingen[item].sName})
				filteredIds.push(this.trainingen[item].subonderdeel_id)
			}
		}
		console.log(filtered)
		return filtered
	},
	filteredAllSub: function(){
		var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een subonderdeel"})
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].subonderdeel_id)){
				filtered.push({'value': this.trainingen[item].subonderdeel_id, 'text': this.trainingen[item].tName + " - " +  this.trainingen[item].oName + " - " + this.trainingen[item].sName})
				filteredIds.push(this.trainingen[item].subonderdeel_id)
			}
		}
		console.log(filtered)
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
	},
	filteredReferentions: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.referentions){
			if(!filteredIds.includes(this.referentions[item].riId && this.referentions[item].oiId == this.selectedSub)){
				filtered.push(this.referentions[item])
				filteredIds.push(this.referentions[item].riId)
			}
		}
       console.log(filtered)
         return filtered
	},	
     filteredLanguage: function(){
         return this.language
     },
},
watch:{
	trainingen: function(){
		console.log("trainingen added");
	},
	questiontype: function(){
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
}

#selection .btn.active{
}
#selection .title .btn{
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
	
.btn{
	background-color: #96BF31;
}
.btn:hover{
	background-color: #203780;
}
</style>