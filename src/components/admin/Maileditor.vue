<template>
	<div class="trainingQuestion">
		<ckeditor :editor="editor" v-model="mailtext" :config="editorConfig"></ckeditor>			
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
			editor: ClassicEditor,
			editorConfig: {// The configuration of the editor.			
			},
			editorData: '',
			mailtext: ''
		}
	},
	methods:{
		saveEditQuestion: function(edit){
			for(var item in edit){
				console.log(edit[item])
			}
			HTTP.put('/questions/'+edit[0].question_id, edit)
			.then(response => {
				console.log(response.data)
				alert(response.data.message)
				this.getQuestions()
			})
		}	
	},
	mounted(){
	},
	computed:{		
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
</style>