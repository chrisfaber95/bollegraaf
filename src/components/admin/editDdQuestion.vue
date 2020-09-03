<template>
	<div class="trainingQuestion">
		<div class="row">
			<div class="col-6">
				<select v-model="newQuestion.language_id">
					<option v-for="item in filteredLanguage" v-bind:key="item.language_id" v-bind:value="item.language_id">{{item.name}}</option>
				</select>
				<br>
				<p>Moeilijkheid</p>
				<select v-model="newQuestion.difficulty">
					<option v-for="item in 9" v-bind:key="item" v-bind:value="item">{{item}}</option>
				</select>
			</div>
		</div>
		<b-form-group id="input-group-2" label="Question:" label-for="input-1">
			<ckeditor :editor="editor" v-model="newQuestion.questionText" :config="editorConfig"></ckeditor>			
		</b-form-group>
		<br/>
		<label for="imageLoader">Afbeelding: </label>
		<input name="bestand" type="file" id="imageLoader" @change="updateCanvasImage"/>
		<br/>
		<div id="dragdrop">
			<canvas id="imageCanvas" @mousemove="showCoordinates" @mousedown="setDraggable" @mouseup="setDraggable"></canvas>	
		</div>
		<b-button v-if="image" @click="newBox(0, 0)">Nieuw antwoord</b-button>
		
		<div v-if="newQuestion.answers.length > 0">
			<div class="answerEditor" v-for="(item, index) in newQuestion.answers" v-bind:key="index">
				{{index}}:<b-input type="text" v-model="item.answer_text" ></b-input>
			</div>
		</div>
		<b-button @click="saveEditQuestion(newQuestion)">Opslaan</b-button>
		<b-button @click="updateCanvas()">update</b-button>
	</div>
</template>

<script>
import ClassicEditor from '@/assets/scripts/editor/build/ckeditor.js';
import {HTTP} from '@/assets/scripts/http-common.js'
	
export default {
	name: 'HelloWorld',
	props: [
		'question',
		'sub'
	],
	components:{
	},
	data: function(){
		return{
			vueCanvas: null,
			box: [],
			image: null,
			isMouseDown: false,
			focused: {
				key: 0,
				state: false
			},
			dragBR: false,
			//image: null,
			closeEnough: 10,
			mousePosition: {
				x: 0,
				y: 0
			},
			editor: ClassicEditor,
			editorConfig: {// The configuration of the editor.			
			},
			editorData: '',
			newQuestion:{
				questionText: "",
				type: "dd",
				answers: [],
				language_id: 1,
				image: '',
				difficulty: 1
			},
			language: null,
			questions: []
		}
	},
	methods:{
		saveEditQuestion: function(edit){
			console.log(edit)
			HTTP.put('/questions/'+this.question, edit)
			.then(response => {
				console.log(response.data)
				alert(response.data.message)
				this.getQuestions()
			})
		},
		update: function(){
			console.log(this.question)
		},
		getQuestion: function(){
			HTTP.get('/questions/single/'+this.question+'/dd')
			.then(response => {
				console.log(response.data)
				this.newQuestion.answers = response.data.question
				this.newQuestion.image = this.newQuestion.answers[0].image
				this.newQuestion.language_id = this.newQuestion.answers[0].language_id
				this.newQuestion.difficulty = this.newQuestion.answers[0].difficulty
				this.newQuestion.questionText = this.newQuestion.answers[0].question_text
				console.log(this.newQuestion.answers)
				this.updateCanvasImageSrc(this.newQuestion.image)
				
				return this.answers
			})
		},
		updateCanvasImage: function(e) {
			var self = this
			var files = e.target.files
			var reader = new FileReader()
			reader.onload = (e) => {
				var img = new Image()
				img.onload = function(){
					self.image = img
					self.newQuestion.image = self.image.src
					self.updateCanvas()
				}
				img.src = e.target.result
			}
			reader.readAsDataURL(files[0])
		},	
		updateCanvasImageSrc: function(src) {
			this.image = new Image();
			this.image.src = src
			console.log(this.image)
			this.drawCanvasImage()
			this.updateCanvas()
		},	
		drawCanvasImage: function() {
			var c = document.getElementById("imageCanvas")
			var elmnt = document.getElementById("dragdrop")
			c.width = elmnt.offsetWidth	
			
			var ctx = c.getContext("2d")			
			this.vueCanvas = ctx
			
			var wrh = this.image.width / this.image.height;
			
            var newWidth = c.width;
            var newHeight = newWidth / wrh;
            if (newHeight > c.height) {
                c.height = newHeight;
            }
			this.vueCanvas.drawImage(this.image,0,0, newWidth , newHeight)
		},		
		drawCanvas: function(){
			var c = document.getElementById("imageCanvas")
			var elmnt = document.getElementById("dragdrop")
			
			console.log(elmnt)	
			c.width = elmnt.offsetWidth		
			console.log(c)	
			
			var ctx = c.getContext("2d")			
			this.vueCanvas = ctx
		},
		newBox: function(x, y){
			var width = document.getElementById("imageCanvas").width/10
			var height = document.getElementById("imageCanvas").height/10
			this.newQuestion.answers.push({translateX: x, translateY: y, width: width, height: height, answer_text: ''})
			this.drawBox(this.newQuestion.answers.length - 1, x, y, (x+width/2), (y + height/2))
			
		},
		drawBox: function(index, x, y, width, height){
			console.log(index)
			this.vueCanvas.beginPath();
			this.vueCanvas.fillStyle  = "#003399";
				
			this.vueCanvas.shadowColor = "#003399";
			this.vueCanvas.shadowBlur = 5;
			this.vueCanvas.shadowOffsetX = 3;
			this.vueCanvas.shadowOffsetY = 3;
			this.vueCanvas.fillRect(x, y, width, height)
			
			this.vueCanvas.font = "16px Arial"	
			this.vueCanvas.textAlign = "center";			
			this.vueCanvas.fillStyle = "white";	
			this.vueCanvas.fillText(this.newQuestion.answers[index].answer_text, (x+width/2), (y + height/2))
			this.vueCanvas.stroke()
			
		},
		updateCanvas: function(){
			var c = document.getElementById("imageCanvas")
			this.vueCanvas.clearRect(0,0,c.width,c.height)
			this.drawCanvasImage()
			for (var i = this.newQuestion.answers.length - 1; i >= 0; i--) {		
				console.log( this.newQuestion.answers[i])
				this.drawBox(i, this.newQuestion.answers[i].translateX, this.newQuestion.answers[i].translateY, this.newQuestion.answers[i].width, this.newQuestion.answers[i].height)
			}
		},
		moveBox: function(){
			if(!this.isMouseDown){
				return;
			}
			//this.getMousePosition(e);
			//if any circle is focused
			if (this.focused.state) {
				if(this.dragBR){
					this.newQuestion.answers[this.focused.key].width = Math.abs(this.newQuestion.answers[this.focused.key].translateX-this.mousePosition.x);
					this.newQuestion.answers[this.focused.key].height = Math.abs(this.newQuestion.answers[this.focused.key].translateY-this.mousePosition.y);
				}
				else{				
					this.newQuestion.answers[this.focused.key].translateX = this.mousePosition.x;
					this.newQuestion.answers[this.focused.key].translateY = this.mousePosition.y;
				}
				this.updateCanvas();
				return;
			}
			
			for (var i = 0; i < this.newQuestion.answers.length; i++) {
			console.log(i)
				if (this.intersects(this.newQuestion.answers[i])) {
					console.log(i)
					this.focused.key = i
					this.focused.state = true;
				}
			}
		},
		intersects: function(box){
			console.log(box)
			if( this.checkCloseEnough(this.mousePosition.x, box.translateX + box.width) && this.checkCloseEnough(this.mousePosition.y, box.translateY + box.height) ){
				console.log("dragbr")
				
				this.dragBR = true;
				return true
			}
			else if((this.mousePosition.x >= box.translateX && this.mousePosition.x <= box.translateX + box.width) && (this.mousePosition.y >= box.translateY && this.mousePosition.y <= box.translateY + box.height)){
			console.log("true")
				return true
			}
			else{
			console.log("false")
				return false
			}
		},
		checkCloseEnough: function(p1, p2){
			return Math.abs(p1-p2)<this.closeEnough;
		},
		setDraggable: function(e){
			//console.log(e)
			var t = e.type
		//	console.log(t)
			if (t == "mousedown") {
				this.isMouseDown = true;				
			} else if (t == "mouseup") {
				this.isMouseDown = false;
				this.releaseFocus();
			}
		},
		releaseFocus: function(){
			this.focused.state = false
			this.dragBR = false
		},
		setupMovable: function(){			
			//document.addEventListener('mousemove', this.move(), false);
			document.addEventListener('mousedown', this.setDraggable(), false);
			document.addEventListener('mouseup', this.setDraggable(), false);
		},
		showCoordinates(e) {
			this.mousePosition.x = e.offsetX;
			this.mousePosition.y = e.offsetY;
			this.moveBox()
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
		this.drawCanvas()
		this.getQuestion()
		this.getLanguage()
		this.update()
	},
	computed:{
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
		},
		questImg(){
			return this.newQuestion.image
		}
	},
	watch:{
		image: function(){
			this.drawCanvasImage()
		},
		questImg: function(){
			this.updateCanvasImageSrc(this.newQuestion.image)
			this.updateCanvas()
		},
		filteredQuestionAnswers: function(){
			this.updateCanvas()
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
#imageCanvas{
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