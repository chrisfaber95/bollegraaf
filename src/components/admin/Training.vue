<template>
  <div class="training">
        <h2>Training</h2>
         <div v-if="setting=='list'">
            <div class="row">
                <div class="col-1">
                    <div v-for="training in filteredTrainingen" v-bind:key="'training'+training.training_id" @click="selectedTraining = training.training_id">
                      <p>{{training.tName}}</p>
                    </div>
                </div>
                <div class="col-1" v-if="selectedTraining">
                    <div v-for="onderdeel in filteredOnderdeel" v-bind:key="'onderdeel'+onderdeel.onderdeel_id" @click="selectedOnderdeel = onderdeel.onderdeel_id">
                      {{onderdeel.oName}}
                    </div>
                </div>
                <div class="col-1" v-if="selectedOnderdeel">
                    <div v-for="sub in filteredSub" v-bind:key="'onderdeel'+sub.subonderdeel_id" @click="getInformation(sub.subonderdeel_id); selectedSub = sub.subonderdeel_id">
                      {{sub.sName}}
                    </div>
                </div>
                <div class="col-9" v-if="selectedSub">
                  <!--  <Texteditor ref="editor" :text="selectedInformation[0].iText"/> -->
                  <carousel 
                    :per-page="1" 
                    :mouse-drag="false" 
                    paginationColor='#000000'
                    paginationActiveColor="#999999"
                    paginationPosition= "top"
                    >
                  <slide class="editors" v-for="edit in info" v-bind:key="'info'+edit.iId">
                    <div>
                    <ckeditor :editor="editor" v-model="edit.iText" :config="editorConfig"></ckeditor>
                    <label>Pagina: </label><input v-model="edit.iPage" :type="'number'" />
                    <b-button @click="saveInformation(edit)">Opslaan</b-button>
                    </div>
                  </slide>
                  </carousel>
                </div>
                
            </div>
          </div>
          <div v-if="setting=='add'">
            <Texteditor />
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
      getInformation: function(onderdeel){
          this.info=[{
              sId: onderdeel,
              iPage: 0,
              iId: 0,
              iText: ''
          }]
          this.selectedsub = onderdeel;
          HTTP.get('information/'+onderdeel)
          .then(response => {
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
          })
      },
      updatePage: function(edit){
        console.log(this.pageEdit);
        console.log(edit)
        this.info[edit].iPage = this.pageEdit;
      }

  },
  mounted(){
      this.getTrainingen();
 },
 computed:{
     filteredTrainingen: function(){
       var filtered = []
       var filteredIds = []
       for(var item in this.trainingen){
         if(!filteredIds.includes(this.trainingen[item].training_id)){
           filtered.push({'training_id': this.trainingen[item].training_id, 'tName': this.trainingen[item].tName})
           filteredIds.push(this.trainingen[item].training_id)
         }
       }
       console.log(filtered)
         return filtered
     },
     filteredOnderdeel: function(){
       var filtered = []
       var filteredIds = []
       for(var item in this.trainingen){
         if(!filteredIds.includes(this.trainingen[item].onderdeel_id) && this.trainingen[item].training_id == this.selectedTraining){
           filtered.push({'onderdeel_id': this.trainingen[item].onderdeel_id, 'oName': this.trainingen[item].oName})
           filteredIds.push(this.trainingen[item].onderdeel_id)
         }
       }
       console.log(filtered)
         return filtered
     },
     filteredSub: function(){
       var filtered = []
       var filteredIds = []
       for(var item in this.trainingen){
         if(!filteredIds.includes(this.trainingen[item].subonderdeel_id) && this.trainingen[item].onderdeel_id == this.selectedOnderdeel){
           filtered.push({'subonderdeel_id': this.trainingen[item].subonderdeel_id, 'sName': this.trainingen[item].sName})
           filteredIds.push(this.trainingen[item].subonderdeel_id)
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
