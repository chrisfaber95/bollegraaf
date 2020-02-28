<template>
  <div class="training">
        <h2>Training</h2>
         <div v-if="setting=='list'">
            <div class="row">
                <div class="col-1">
                    <div v-for="training in filteredTrainingen" v-bind:key="training.id" @click="getSelectedTraining(training.tId)">
                      {{training.tName}}
                    </div>
                </div>
                <div class="col-2" v-if="selectedTraining">
                    <div v-for="onderdeel in selectedTraining" v-bind:key="onderdeel.id" @click="getInformation(onderdeel)">
                      {{onderdeel.oName}}
                      {{onderdeel.sName}}
                      {{onderdeel.oTime}}
                    </div>
                </div>
                <div class="col-9" v-if="selectedInformation">
                    <Texteditor ref="editor" :text="selectedInformation[0].iText"/>
                  {{selectedInformation}}
                  <b-button @click="saveInformation(selectedInformation[0])"> </b-button>
                </div>
                
            </div>
          </div>
          <div v-if="setting=='add'">
            <Texteditor />
          </div>
  </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
import Texteditor from '@/components/Texteditor.vue';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  components:{
    Texteditor
  },
  data: function(){
    return{
        trainingen: [],
        selectedTraining: null,
        selectedInformation: null
    }
  },
  methods:{
      getTrainingen: function(){
          HTTP.get('training')
          .then(response => {
            console.log(response.data)
            this.trainingen = response.data.training
            return response.data.training
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
      getInformation: function(onderdeel){
          HTTP.get('information/'+onderdeel.sId)
          .then(response => {
            console.log(response.data)
            this.selectedInformation = response.data.info
            return response.data.info
          })
      },
      saveInformation: function(info){
        info.iText = this.$refs.editor.getEditorText();
        console.log(info)
          HTTP.put('information/update/'+info.iId, info)
          .then(response => {
            console.log(response.data)
            this.selectedInformation = response.data.info
            return response.data.info
          })
      },

  },
  mounted(){
      this.getTrainingen();
 },
 computed:{
     filteredTrainingen: function(){
         return this.trainingen
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
