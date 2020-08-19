<template>
  <div class="training">
        <h2>Instellingen</h2>
        <hr>
		<h3>Vertalingen</h3>
		<input ref="file" id="file" type="file" @change="handleFileUpload()" accept=".csv">
		<b-button @click="sendFile()">Toevoegen</b-button>
		<b-button @click="retrieveFile()">Download translation csv</b-button>
  </div>
</template>

<script>
import {HTTP, Files} from '@/assets/scripts/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  data: function(){
    return{
		file: ''
    }
  },
  methods:{
		handleFileUpload(){
			this.file = this.$refs.file.files[0];
		},
		sendFile() {
			let formData = new FormData()
			console.log(this.file.type)
			if(this.file.type == 'application/vnd.ms-excel'){
				formData.append('file', this.file)
				HTTP.put('translation/', formData,
				{
				headers: {
					'Content-Type': 'multipart/form-data'
					}
				})
				.then(response => {
					console.log(response)
				}, error => {
					console.log(error)
				});
			}
			else{
				alert("This type of file can not be uploaded, please only use CSV")
			}
		},
		retrieveFile: function(){
			window.open(Files + 'translate/vertalingbollegraaf.csv', "_blank")
		}
  },
  mounted(){
 },
 computed:{
 },
 watch:{
     tests: function(){
         console.log("tests added");
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
</style>
