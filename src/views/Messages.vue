<template>
  <div class="berichten">
    <Header />
    <div class="container-fluid">
        <div class="container">
            <h2 class="pagetitle">Berichten</h2>
            <div class="row">
            <div class="col-6 berichtenlist">
                <div class="row" id='title-row'>
                    <div class="col-4">
                        <b>Afzender</b>
                    </div>
                    <div class="col-5">
                        <b>Onderwerp</b>
                    </div>
                    <div class="col-3">
                        <b>Ontvangen</b>
                    </div>
                </div>
                <hr>
                <div class="row" v-for="item in filteredMessages" v-bind:key="item.id" @click="selectedMessage = item; if(item.isOpened == 0)updateMessage(item)">
                    <div class="col-4">
                        {{item.fromName}} {{item.fromSurname}}
                    </div>
                    <div class="col-5">
                        {{item.mSubject}}
                    </div>
                    <div class="col-3">
                        {{item.mDate}}
                    </div>
                </div>
            </div>
           <div class="message">
                <div class="col-6" v-if="selectedMessage">
                    <p>Datum: {{selectedMessage.mDate}}</p>
                    <p>Afzender: {{selectedMessage.fromName + " " + selectedMessage.fromSurname}}</p>
                    <p>Onderwerp: {{selectedMessage.mSubject}}</p>
                    <hr>
                    <p>Bericht: </p>
                    {{selectedMessage.mContent}}
                </div>
                <div class="col-6" v-if="!selectedMessage">
                <p>Selecteer een email om deze te openen.</p>
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/general/Header.vue'
//import Message from '@/components/messages/Message.vue'
import {HTTP} from '@/assets/scripts/http-common.js'

export default {
  name: 'Home',
  components: {
      Header,
  },
  data: function(){
    return{
        messages: [],
        selectedMessage: null
    }
  },
  methods:{
      getMessages: function(){
          HTTP.get('message/'+localStorage.getItem('id_token'))
         .then(response =>{
            console.log(response)
         this.messages = response.data.message;
        })
      },
      updateMessage: function(message){
          message.isOpened = 1;
          console.log(message)
        HTTP.put('/message/'+message.mId, message)
            .then(response => {
            console.log(response.data)
        })
      }
  },
  mounted() {
      this.getMessages();
  },
  computed:{
      filteredMessages: function(){
          console.log(this.messages)
          return this.messages;
      }
  }
}
</script>

<style scoped>
.berichten .container{
    min-height: 100vh;
    max-width: 85vw;
    text-align: left;
    background-color: #ffffff;
}

.berichten .container-fluid{
    background-color: #ffffff;
}
.berichten .container>.row{
    min-height: 100vh;
}
  .berichten{
    min-height: 100vh;
  }
  .pagetitle{
    border-bottom: 2px solid orange;
    text-align: start;
    padding-top:25px;  
  }
  .berichtenlist{
      border-right: 1px solid #cccccc;
      min-height:100vh;
  }
 .berichtenlist hr{
      border-bottom: 1px solid #0051ff;
      margin-top: 0;
  }
</style>