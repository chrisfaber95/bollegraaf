<template>
  <div class="training">
        <h2>Quiz questions</h2>
         <div v-if="setting=='list'">
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
        </div>
  </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  data: function(){
    return{
        questions: [],
        selectedQuestion: null
    }
  },
  methods:{
      getTests: function(){
          HTTP.get('/questions')
          .then(response => {
            console.log(response.data)
            this.questions = response.data.question
            return this.questions
          })
      },
      closeModal: function(){
        this.$bvModal.hide('modal-question')
      },
      changeQuestion: function(sub){
          this.selectedQuestion = sub
      }

  },
  mounted(){
      this.getTests();
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
        
       //  return this.questions


     }
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
