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
					<option v-for="item in 5" v-bind:key="item" v-bind:value="item">{{item}}</option>
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
		<canvas id="imageCanvas" @mousemove="showCoordinates" @mousedown="setDraggable" @mouseup="setDraggable"></canvas>	
		<b-button v-if="image" @click="newBox(0, 0)">Nieuwe Antwoord</b-button>
		<div v-if="newQuestion.answers.length > 0">
			<div class="answerEditor" v-for="(item, index) in newQuestion.answers" v-bind:key="index">
				{{index}}:<b-input type="text" v-model="item.answer_text" ></b-input>
			</div>
		</div>
	</div>
</template>

<script>
import ClassicEditor from '@/assets/scripts/editor/build/ckeditor.js';
import {HTTP} from '@/assets/scripts/http-common.js'
	
export default {
	name: 'HelloWorld',
	props: [
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
			language: null
		}
	},
	methods:{
		addQuestion: function(sub){
			if(this.newQuestion.questionText != "" || this.newQuestion.questionText !="<p></p>" || this.newQuestion.image != '' || this.newQuestion.answers.length != 0){
				var data = {
					subId: sub,
					question: this.newQuestion
				}
				console.log(data)
				HTTP.post('/questions', data)
				.then(response => {
					console.log(response.data)
					this.$parent.questions = response.data
					return this.$parent.questions
				})
			}
			else{
				alert("You cant save an incomplete question")
			}
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
		drawCanvasImage: function() {
			var wrh = this.image.width / this.image.height;
			var c = document.getElementById("imageCanvas")
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
			
			c.width = elmnt.offsetWidth			
			
			var ctx = c.getContext("2d")			
			this.vueCanvas = ctx
			if(this.newQuestion.answers.length > 0){
				this.updateCanvas()
			}
		},
		newBox: function(x, y){
			var width = document.getElementById("imageCanvas").width/10
			var height = document.getElementById("imageCanvas").height/10
			this.newQuestion.answers.push({x: x, y: y, width: width, height: height, answer_text: ''})
			this.vueCanvas.beginPath();
			this.vueCanvas.fillStyle  = "#003399";
				
			this.vueCanvas.shadowColor = "#003399";
			this.vueCanvas.shadowBlur = 5;
			this.vueCanvas.shadowOffsetX = 3;
			this.vueCanvas.shadowOffsetY = 3;
			
			this.vueCanvas.fillRect(x, y, width, height)
			this.vueCanvas.stroke()
			
			this.vueCanvas.font = "16px Arial"	
			this.vueCanvas.textAlign = "center";			
			this.vueCanvas.fillStyle = "white";			
			this.vueCanvas.fillText(this.newQuestion.answers.length - 1, (x+width/2), (y + height/2))
			console.log(this.newQuestion.answers)
		},
		drawBox: function(index, x, y, width, height){
			this.vueCanvas.beginPath();
			this.vueCanvas.fillStyle  = "#003399";
				
			this.vueCanvas.shadowColor = "#003399";
			this.vueCanvas.shadowBlur = 5;
			this.vueCanvas.shadowOffsetX = 3;
			this.vueCanvas.shadowOffsetY = 3;
			this.vueCanvas.fillRect(x, y, width, height)
			this.vueCanvas.stroke()
			
			this.vueCanvas.font = "16px Arial"	
			this.vueCanvas.textAlign = "center";			
			this.vueCanvas.fillStyle = "white";	
			this.vueCanvas.fillText(index, (x+width/2), (y + height/2))
			
			
		},
		updateCanvas: function(){
			var c = document.getElementById("imageCanvas")
			this.vueCanvas.clearRect(0,0,c.width,c.height)
			this.drawCanvasImage()
			for (var i = this.newQuestion.answers.length - 1; i >= 0; i--) {
				this.drawBox(i, this.newQuestion.answers[i].x, this.newQuestion.answers[i].y, this.newQuestion.answers[i].width, this.newQuestion.answers[i].height)
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
					this.newQuestion.answers[this.focused.key].width = Math.abs(this.newQuestion.answers[this.focused.key].x-this.mousePosition.x);
					this.newQuestion.answers[this.focused.key].height = Math.abs(this.newQuestion.answers[this.focused.key].y-this.mousePosition.y);
				}
				else{				
					this.newQuestion.answers[this.focused.key].x = this.mousePosition.x;
					this.newQuestion.answers[this.focused.key].y = this.mousePosition.y;
				}
				this.updateCanvas();
				return;
			}
			
			for (var i = 0; i < this.newQuestion.answers.length; i++) {
				if (this.intersects(this.newQuestion.answers[i])) {
					this.focused.key = i
					this.focused.state = true;
					break;
				}
			}
		},
		intersects: function(box){
		console.log(this.mousePosition.y <= box.y + box.height)
			if( this.checkCloseEnough(this.mousePosition.x, box.x + box.width) && this.checkCloseEnough(this.mousePosition.y, box.y + box.height) ){
				this.dragBR = true;
				return true
			}
			if((this.mousePosition.x >= box.x && this.mousePosition.x <= box.x + box.width) && (this.mousePosition.y >= box.y && this.mousePosition.y <= box.y + box.height)){
			//console.log("true")
				return true
			}
			else{
			//console.log("false")
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
		this.getLanguage()
	},
	computed:{
		filteredLanguage: function(){
			return this.language
		},
	},
	watch:{
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