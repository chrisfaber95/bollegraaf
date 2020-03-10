<template>
  <div class="training">
        <h2>Training</h2>
         <div v-if="setting=='list'">
            <div class="row" id="selection">
                <div class="col-12">
                    <div class="title"><h3>Training</h3><b-button>Voeg toe</b-button></div>
                    <b-button v-for="training in filteredTrainingen" 
                              v-bind:key="'training'+training.training_id" 
                              @click="selectedTraining = training.training_id; selectedOnderdeel = null; active_onderdeel = null; active_training  = 'training'+training.training_id"
                              v-bind:class="{ 'active':  active_training  == 'training'+training.training_id }">
                      {{training.tName}}
                    </b-button>
                </div>
                <div class="col-12" v-if="selectedTraining">
                    <div class="title"><h3>Onderdeel</h3><b-button>Voeg toe</b-button></div>
                    <b-button v-for="onderdeel in filteredOnderdeel" 
                              v-bind:key="'onderdeel'+onderdeel.onderdeel_id" 
                              @click="selectedOnderdeel = onderdeel.onderdeel_id; selectedSub = null; active_sub = null; active_onderdeel = 'onderdeel'+onderdeel.onderdeel_id"
                             v-bind:class="{ 'active':  active_onderdeel == 'onderdeel'+onderdeel.onderdeel_id }" >
                      {{onderdeel.oName}}
                    </b-button>
                </div>
                <div class="col-12" v-if="selectedOnderdeel">
                    <div class="title"><h3>Categorie</h3><b-button>Voeg toe</b-button></div>
                    <b-button v-for="sub in filteredSub" 
                              v-bind:key="'subonderdeel'+sub.subonderdeel_id" 
                              @click="getInformation(sub.subonderdeel_id); changeSubonderdeel(sub.subonderdeel_id); active_sub = 'subonderdeel'+sub.subonderdeel_id"
                              v-bind:class="{ 'active':  active_sub == 'subonderdeel'+sub.subonderdeel_id}" >
                      {{sub.sName}}
                    </b-button>
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
                 <!--   <Texteditor ref="editor" :text="selectedInformation[0].iText"/> -->
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
        active_sub: null
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
          })
      },
      updatePage: function(edit){
        console.log(this.pageEdit);
        console.log(edit)
        this.info[edit].iPage = this.pageEdit;
      },
      closeModal: function(){
        this.$bvModal.hide('modal-3')
      },
      changeSubonderdeel: function(sub){
          this.selectedSub = sub
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
</style>
