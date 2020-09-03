<template>
  <div class="trainingInformation">
	<div class="row">
		<!--<div class="col-6">		
			<draggable v-model="info" @change="onChange">
				<transition-group>
					<div class="pages" v-for="element in filteredInfo" :key="element.iId">
						<div v-if="element.iTitle != '' &&element.iPage != 0">
							{{element.iTitle}} -- {{language[element.language_id-1].name}}
						</div>
					</div>
				</transition-group>
			</draggable>
		</div>-->
		<div class="col-6">
			<p>Kies informatie taal:</p>
			<select v-model="currentLanguage">
				<option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
			</select>
		</div>
	</div>
	
		<hr/>
	<carousel 
		:per-page="1" 
		:mouse-drag="false" 
		paginationColor='#000000'
		paginationActiveColor="#999999"
		paginationPosition= "top"
	>	
		<slide class="editors" v-for="edit in filteredInfo" v-bind:key="'info'+edit.iId">		
			<div class="">
				<label>Titel: </label><input v-model="edit.iTitle" :type="'text'" />
			</div>
			<div class="">
				<label>Paginanummer: </label><input v-model="edit.iPage" :type="'number'" />
			</div>
			<div class="">
				<label>Taal: </label>			
				<select v-model="edit.language_id">
					<option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
				</select>
				<br>
				<label>Moeilijkheid: </label>	
				<select v-model="edit.difficulty">
					<option v-for="item in 9" v-bind:key="item" v-bind:value="item">{{item}}</option>
				</select>
			</div>
			
			<div class="">
				<b-button @click="deleteInformation(edit.iId)">Delete pagina</b-button>
				<b-button @click="saveInformation(edit)">Pagina opslaan</b-button>
			</div>			
			<div class="">
				<ckeditor :editor="editor" v-model="edit.iText" :config="editorConfig"></ckeditor>
			</div>			
			<div class="">
				<label>Referentietekst: </label><input v-model="newRef.refText" :type="'text'" />
				<b-form-group id="input-group-3" label="Referentie:" label-for="input-5">
					<b-form-select
						type="text" 
						name="subonderdeel"
						:options="filteredAllSub"
						v-model="newRef.subId"
						id= "input-5"
					></b-form-select>
				<b-button @click="addTrainingRef(edit.iId)" v-if="newRef.subId != 0 && newRef.refText != '' ">Referentie opslaan</b-button>
				</b-form-group>
			<b-form-group id="input-group-3" label="Referentie:" label-for="input-6" v-if="referentions != null">
				<select v-model="selectedRef">
					<option v-for="item in filteredReferentions" v-bind:key="item.language_id" v-bind:value="item.riId">{{item.oiId}} -- {{item.riText}}</option>
				</select>
				<b-button @click="deleteReferentie(selectedRef)">Delete referention</b-button>
			</b-form-group>
			</div>			
			
		</slide>
	</carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import {HTTP} from '@/assets/scripts/http-common.js'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@/assets/scripts/editor/build/ckeditor.js';
	
//import draggable from 'vuedraggable'
	
export default {
  name: 'HelloWorld',
  props: [
	'setting',
	'selectedSub'
  ],
  components:{
    Carousel,
    Slide,
//	draggable
  },
data: function(){
	return{
        info: [{
          sId: 0,
          iPage: 0,
          iId: 0,
          iText: '',
			language_id: 0,
			difficulty: 1
        }],
		referention: [],
		selectedRef: null,
		newRef:{
			opened: 0,
			subId: 0,
			refText: ''
		},
        pageEdit: 0,
        editor: ClassicEditor,
        editorConfig: {// The configuration of the editor.			
		},
        editorData: '',
        language: null,
        currentLanguage: null,
		referentions: null
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
      getInformation: function(){
		console.log(this.selectedSub)
		this.info=[{
			sId: this.selectedSub,
			iPage: 0,
			iId: 0,
			iText: '',
			language_id: 1,
			difficulty: 1
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
		this.getInformation()
      },
      deleteInformation: function(iId){
		if(confirm("Do you really want to delete?")){
        HTTP.delete('information/'+iId)
          .then(response => {
            console.log(response.data)
			alert(response.data.message)
			this.getInformation()
          })
		}
      },
	getReferentions: function(){
		HTTP.get('referentions')
		.then(response => {
			console.log(response.data)
			this.referentions = response.data.referention
			console.log(this.referentions)
		})		
	},
      deleteReferentie: function(iId){
		if(confirm("Do you really want to delete?")){
			HTTP.delete('referentions/'+iId)
			.then(response => {
				console.log(response.data)
				alert(response.data.message)
				this.getReferentions()
			})
		}
      },
      closeModal: function(){
        this.$bvModal.hide('modal-3')
      },
	onChange: function(evt){
		console.log(evt)
		console.log(this.filteredInfo)
		
		var filtered = []
		var filteredIds = []
		for(var item in this.info){
			if(!filteredIds.includes(this.info[item].iId) && (this.info[item].language_id == this.currentLanguage || this.info[item].iText == '')){
				filtered.push(this.info[item])
				filteredIds.push(this.info[item].iId)
			}
		}
		
		console.log(filtered)
		for(var page in filtered){
			if(filtered[page].iPage != 0){
				filtered[page].iPage = page
				HTTP.put('information/update/'+filtered[page].iId, filtered[page])
					.then(response => {
					console.log(response.data)
				})
			}
		}	
		this.getInformation()	
		return true;
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
		this.getReferentions()
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
	this.getInformation()
	this.getReferentions()
	this.getLanguage()
	
},
computed:{
	filteredAllSub: function(){
		var filtered = []
		var filteredIds = []
		filtered.push({'value': null, 'text': "Kies een subonderdeel"})
		for(var item in this.$parent.trainingen){
			if(!filteredIds.includes(this.$parent.trainingen[item].subonderdeel_id)){
				filtered.push({'value': this.$parent.trainingen[item].subonderdeel_id, 'text': this.$parent.trainingen[item].tName + " - " +  this.$parent.trainingen[item].oName + " - " + this.$parent.trainingen[item].sName})
				filteredIds.push(this.$parent.trainingen[item].subonderdeel_id)
			}
		}
		console.log(filtered)
		return filtered
	},
	filteredReferentions: function(){
		console.log(this.referentions)
		var filtered = []
		var filteredIds = []
		if(this.referentions != null){
			for(var item in this.referentions){
				if(!filteredIds.includes(this.referentions[item].riId && this.referentions[item].oiId == this.selectedSub)){
					filtered.push(this.referentions[item])
					filteredIds.push(this.referentions[item].riId)
				}
			}
		}
       console.log(filtered)
         return filtered
	},	
     filteredLanguage: function(){
         return this.language
     },
		filteredInfo: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.info){
			if(!filteredIds.includes(this.info[item].iId) && (this.info[item].language_id == this.currentLanguage || this.info[item].iText == '')){
				if(this.info[item].iText == ''){
					this.info[item].language_id == this.currentLanguage
				}
				filtered.push(this.info[item])
				filteredIds.push(this.info[item].iId)
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
.pages{
	padding: 10px;
	border: 1px solid #cccccc;
	background: #eeeeee
}
</style>
<style>
.ck-color-ui-dropdown .ck-dropdown__panel{
	height: 140px;
	overflow-y: scroll;
}
.ck-font-family-dropdown .ck-dropdown__panel{
	height: 140px;
	overflow-y: scroll;
}
</style>