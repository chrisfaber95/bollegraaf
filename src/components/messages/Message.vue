<template>
    <div class="message">
        <div class="col-6" v-if="selectedMessage">
            <p>Datum: {{selectedMessage.mDate}}</p>
            <p>Afzender: {{selectedMessage.fromName + " " + selectedMessage.fromSurname}}</p>
            <p>Onderwerp: {{selectedMessage.mSubject}}</p>
            <hr>
            <p>Bericht: </p>
            {{selectedMessage.mContent}}
        </div>
    </div>
</template>

<script>
//import {HTTP} from '@/components/http-common.js'

export default {
  name: 'Message',
  props: [
    'message'
  ],
  mounted(){
 },
 methods:{
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
</style>
