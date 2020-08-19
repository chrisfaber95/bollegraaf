<template>
	<div class="question">
	<b-button id="save-btn" @click="saveAnswers(questionId)" :disabled="checked_answers">{{$t("training.controleren")}}</b-button>
		<div id="dragdrop">
		<h4>{{$t("training.antwoorden")}}</h4>
		<canvas id="imageCanvas" @mousemove="showCoordinates" @mousedown="setDraggable" @mouseup="setDraggable"></canvas>
		
		
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
		checked_answers: false,
		
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
		}
    }
  },
 methods:{
	getQuestion: function(){
		console.log(this.questionId)
		HTTP.get('/questions/single/'+this.questionId+'/dd')
		.then(response => {
			console.log(response.data)
			this.answers = response.data.question
			console.log(this.answers)
			for(var item in this.answers){
				this.answers[item].translateX = 0
				this.answers[item].translateY = 50 * item
				this.answers[item].width = 50
				this.answers[item].height = 50
				this.answers[item].correct = 0
			}
			console.log(this.answers)
			this.updateCanvasImage(this.answers[0].image)
			return this.answers
		})
	},
	getAnswers: function(){
		HTTP.get('/questions/single/'+this.questionId+'/dd')
		.then(response => {
			console.log(response.data)
			this.questions = response.data.question
			return this.questions
		})
	},
	updateCanvasImage: function(src) {
		this.image = new Image();
		this.image.src = src
		this.updateCanvas()
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
		if(this.questions.length > 0){
			this.updateCanvas()
		}
	},
	drawBox: function(i, text, x, y, width, height){
		var hMargin = 4
		var fontHeight = 16
		this.vueCanvas.font = fontHeight + 'px Arial'	
		var txtWidth = this.vueCanvas.measureText(text).width + 2 * hMargin
		this.vueCanvas.beginPath();
		
		if(this.answers[i].correct == 0){
			this.vueCanvas.fillStyle = "#003399";			
		}
		else if(this.answers[i].correct == 1){
			this.vueCanvas.fillStyle = "red";			
		}
		else if(this.answers[i].correct == 2){
			this.vueCanvas.fillStyle = "green";			
		}
		else{
			this.vueCanvas.fillStyle = "#003399";	
		}
		this.vueCanvas.shadowColor = "#003399";
		this.vueCanvas.shadowBlur = 5;
		this.vueCanvas.shadowOffsetX = 3;
		this.vueCanvas.shadowOffsetY = 3;
		this.vueCanvas.fillRect(x, y, txtWidth + hMargin, fontHeight*2 + hMargin)
		this.vueCanvas.stroke()
		
		this.vueCanvas.font = fontHeight + 'px Arial'	
		this.vueCanvas.textAlign = "center";
		this.vueCanvas.fillStyle = "white";	
		this.vueCanvas.fillText(text, (x+txtWidth/2), (y + height/2))
		
	},
	updateCanvas: function(){
		var c = document.getElementById("imageCanvas")
		this.vueCanvas.clearRect(0,0,c.width,c.height)
		this.drawCanvasImage()
		this.vueCanvas.beginPath();
		this.vueCanvas.shadowColor = "#000000";
		this.vueCanvas.shadowBlur = 5;
		this.vueCanvas.shadowOffsetX = 3;
		this.vueCanvas.shadowOffsetY = 3;
		this.vueCanvas.strokeRect(0, 0, 150, 25*2*this.answers.length + 4)
		this.vueCanvas.stroke()
		for (var i = 0; i < this.answers.length; i++) {
			this.drawBox(i, this.answers[i].answer_text, this.answers[i].translateX, this.answers[i].translateY, this.answers[i].width, this.answers[i].height)
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
				this.answers[this.focused.key].width = Math.abs(this.answers[this.focused.key].translateX-this.mousePosition.x);
				this.answers[this.focused.key].height = Math.abs(this.answers[this.focused.key].translateY-this.mousePosition.y);
			}
			else{				
				this.answers[this.focused.key].translateX = this.mousePosition.x;
				this.answers[this.focused.key].translateY = this.mousePosition.y;
			}
			this.updateCanvas();
			return;
		}
		
		for (var i = 0; i < this.answers.length; i++) {
			if (this.intersects(this.answers[i])) {
				this.focused.key = i
				this.focused.state = true;
				break;
			}
		}
	},
	intersects: function(box){
	console.log(this.mousePosition.y <= box.y + box.height)
		if( this.checkCloseEnough(this.mousePosition.x, box.translateX + box.width) && this.checkCloseEnough(this.mousePosition.y, box.translateY + box.height) ){
			this.dragBR = true;
			return true
		}
		if((this.mousePosition.x >= box.translateX && this.mousePosition.x <= box.translateX + box.width) && (this.mousePosition.y >= box.translateY && this.mousePosition.y <= box.translateY + box.height)){
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
		for(var item in this.questions){
			if(this.rectOverlap(this.answers[item], this.questions[item])){
			console.log(this.answers)
			console.log(this.questions)
			console.log(this.rectOverlap(this.answers[item], this.questions[item]))
				this.answers[item].correct = 2
				this.correct_answer += 1
			}
			else{
				this.answers[item].correct = 1
			}
		}
		this.updateCanvas();
		this.checked_answers = true;
		var data= {
			question_id: quest,
			correct_answers: this.correct_answer,
			date: new Date(),
			possible_answers: this.answers.length
		}
		if(this.answers.length != this.correct_answer && this.correct_answer != 0){
			++this.page.summary.part
		}
		else if(this.correct_answer == 0){
			++this.page.summary.wrong
		}
		else if(this.answers.length == this.correct_answer){
			++this.page.summary.correct
		}
		++this.page.summary.amount
		HTTP.post('/progress/'+localStorage.id_token, data)
		.then(response => {
			console.log(response.data)
		})
	},
	rectOverlap: function(a, b){
		if (a.translateX >= b.translateX + b.width || a.translateY >= b.translateY + b.height || 
			a.translateX+ a.width <= b.translateX || a.translateY + a.height <= b.translateY)
		{
			return false
		}
		else
		{
			return true
		}
	}
 },
  mounted(){
	this.drawCanvas()
    this.getQuestion()
	this.getAnswers()
 },
	computed:{
	filteredAnswers: function(){
		var filtered = []
		var filteredIds = []
		for(var item in this.questions){
			if(!filteredIds.includes(this.questions[item].dd_answer_id) && this.questions[item].dd_answer_id != null){
				filtered.push(this.questions[item])
				filteredIds.push(this.questions[item].dd_answer_id)
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
#dragdrop{
	width: 100%;
}
</style>
