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
                  <b-modal id="modal-3" size="xl" hide-footer hide-header v-if="selectedSub">
                      <div class="d-block">
                          <div class="row">
                              <div class="profile-block col-12" id="sub">
                                  <carousel 
                                  :per-page="1" 
                                  :mouse-drag="false" 
                                  paginationColor='#000000'
                                  paginationActiveColor="#999999"
                                  paginationPosition= "top"
                                  >
                                  <slide class="editors" v-for="edit in info" v-bind:key="'info'+edit.iId">
                                    <ckeditor :editor="editor" v-model="edit.iText" :config="editorConfig"></ckeditor>
                                    <label>Pagina: </label><input v-model="edit.iPage" :type="'number'" />
                                    <b-button @click="saveInformation(edit)">Opslaan</b-button>
                                  </slide>
                                </carousel>
                              </div>
                          </div>
                      </div>
                      <div class="buttons">
                          <b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
                      </div>
                  </b-modal>
               <div class="col-12" v-if="selectedSub">

				<toggle-switch
				:options="myOptions"
				v-model="infoSwitch"
				v-on:click="getQuestions(selectedSub.value)"
				/>
                 <!--   <Texteditor ref="editor" :text="selectedInformation[0].iText"/> -->
				<div class="info" v-if="infoSwitch == 'Info'">
					<carousel 
						:per-page="1" 
						:mouse-drag="false" 
						paginationColor='#000000'
						paginationActiveColor="#999999"
						paginationPosition= "top"
					>
						<slide class="editors" v-for="edit in info" v-bind:key="'info'+edit.iId">
							<label>Pagina: </label><input v-model="edit.iPage" :type="'number'" />
							<b-button @click="deleteInformation(edit.iId)">Delete pagina</b-button>
							<div>
							<ckeditor :editor="editor" v-model="edit.iText" :config="editorConfig"></ckeditor>
							<b-button @click="saveInformation(edit)">Opslaan</b-button>
							</div>
						</slide>
					</carousel>
				</div>
				<div class="info" v-if="infoSwitch == 'Vragen'">
					<div class="col-1">
						<b-button  v-b-modal.modal-newquestion class="bewerk-btn">Bewerk</b-button>
					</div>
					<div class="row" v-for="question in filteredQuestions" v-bind:key="question.id">
						<div class="col-1">
							{{question.question_id}}
						</div>
						<div class="col-2">
							{{question.question_text}}
						</div>
						<div class="col-2">
							{{question.tName}}
						</div>
						<div class="col-2">
							{{question.sName}}
						</div>
						<div class="col-1">
							<b-button  v-b-modal.modal-question class="bewerk-btn" @click="changeQuestion(question)">Bewerk</b-button>
						</div>
					</div>

					<b-modal id="modal-question" size="xl" hide-footer hide-header v-if="selectedQuestion">
						<div class="d-block">
							<div class="row">
								<div class="profile-block col-6" id="algemeen" v-if="selectedQuestion">
									{{selectedQuestion}}
										<b-form-checkbox v-model="selectedQuestion.isVisible" value="1" unchecked-value="0" @change="updateTraining(training, selectedQuestion)">
										</b-form-checkbox>
								</div>
							</div>
						</div>
						<div class="buttons">
							<b-button class="mt-3" block @click="closeModal()">Wijzigingen opslaan</b-button>
							<b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
						</div>
					</b-modal>
					
					<b-modal id="modal-newquestion" size="xl" hide-footer hide-header>
						<div class="d-block">
							<div class="row">
								<b-form-group id="input-group-2" label="Quetiontype:" label-for="input-1">
									<b-form-select
										type="text" 
										name="question"
										v-model="questiontype" 
										id= "input-2"
									>
										<b-form-select-option :value="null">Please select a questiontype</b-form-select-option>
										<b-form-select-option value="tf">True/False</b-form-select-option>
										<b-form-select-option value="mc" disabled>Multiple Choice</b-form-select-option>
										<b-form-select-option value="dd" disabled>Drag & Drop</b-form-select-option>
										<b-form-select-option value="m" disabled>Match</b-form-select-option>
									</b-form-select>				
								</b-form-group>
								<div v-if="questiontype == 'tf'">
									<b-form-group id="input-group-2" label="Quetion:" label-for="input-1">
										<b-form-input
											type="text" 
											name="questiontext"
											v-model="newQuestion"
											id= "input-3"
										>
										</b-form-input>				
									</b-form-group>
									<b-form-group id="input-group-2" label="Correct answer:" label-for="input-1">
										<b-form-radio v-model="tfanswers" name="some-radios" value="true">True</b-form-radio>
										<b-form-radio v-model="tfanswers" name="some-radios" value="false">False</b-form-radio>
									</b-form-group>
								</div>								
							</div>
						</div>
						<div class="buttons">
							<b-button class="mt-3" block @click="addQuestion()">Vraag opslaan</b-button>
							<b-button class="mt-3" block @click="closeModal()">Sluiten</b-button>
						</div>
					</b-modal>
				</div>
			</div>
		</div>
		<div v-if="setting=='add'">
			<div class="profile-block col-6" id="algemeen">
				<h3>Training</h3>
				<div class="inputrow"><p>Naam</p><input type="text" v-model="info.name"/></div>
			</div>
			<div class="profile-block col-6" id="contact">
				<h3>Onderdeel</h3>
				<div class="inputrow"><p>Naam</p><input type="text"  v-model="info.email"/></div>
			</div>
			<div class="profile-block col-6" id="werk">
				<h3>Categorie</h3>
				<div class="inputrow"><p>Naam</p><input type="text"  v-model="info.function"/></div>
			</div>
			<b-button @click="addTraining()">Training toevoegen</b-button>
		</div>
	</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import {HTTP} from '@/assets/scripts/http-common.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  components:{
    Carousel,
    Slide
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
          iText: ''
        }],
        pageEdit: 0,
        editor: ClassicEditor,
        editorConfig: {// The configuration of the editor.
            },
        editorData: '',
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
		tfanswers:null,
		questiontype: "null",
		myOptions: {
			layout: {
				color: 'black',
				backgroundColor: 'lightgray',
				selectedColor: 'white',
				selectedBackgroundColor: 'green',
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
					{name: 'Info', color: 'white', backgroundColor: 'blue'}, 
					{name: 'Vragen', color: 'white', backgroundColor: 'green'}
				]
			}
		}
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
			iText: ''
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
			this.getInformation()
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
			HTTP.put('training/' + this.selectedTraining)
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
			answers:[]
		}
		
		if(this.tfanswers == "true"){
			data.answers = [{value: "true", correct: 1},
			{value: "false", correct: 0}]
		}
		else{
			data.answers = [{value: "true", correct: 0},
			{value: "false", correct: 1}]
		}
		console.log(data)
		HTTP.post('/questions', data)
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question
			//console.log(this.questions)
			return this.questions
		})
	},	
//	closeModal: function(){
//		this.$bvModal.hide('modal-question')
	//},
	changeQuestion: function(sub){
		this.selectedQuestion = sub
	}
},
mounted(){
	this.getTrainingen();
	
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
},
watch:{
	trainingen: function(){
		console.log("trainingen added");
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