<template>
    <div class="training">
        <div class="header">
            <div class="logo">
                <b-navbar-brand href="#">
                    <img class="img-fluid" src= "../assets/bollegraaf-recycling-solutions-vector-logo.svg" height="40" width="200">
                </b-navbar-brand>
            </div>
            <div class="title">
             <h2> Training: {{this.training.trainingName}} </h2>
            </div>
        </div>
        <div id="training-block">
          <div class="test-block">
              <h2>Introductie</h2>
              <hr>
              <div class="row">
                <div class="col-6">
                  <p>Linker kollom</p>
                </div>
                <div class="col-6">
                  <p>rechter kollom</p>
                </div>
              </div>
          </div>
          <div class="footer">
            <b-button id="afsluiten-btn">Afsluiten</b-button>
            <b-button id="help-btn">Help</b-button>
            <div id="training-btn">
              <p>Training block block block block</p>
            </div>
            <div id="test-btn">
              <p>Test block block block</p>
            </div>
            <div class="changePage-btn">
              <b-button id="vorige-btn">Vorige</b-button>
              <b-button id="volgende-btn">Volgende</b-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/assets/scripts/http-common.js';

export default {
  name: 'HelloWorld',
  props: [
  ],
  data: function(){
    return{
      training: null    
    }
  },
  methods:{
    getTraining: function(){
       HTTP.get('training/'+this.$route.params.training)
      .then(response =>{
        this.training = response.data.training
        console.log(this.training)
      })
    }
  },
  mounted(){
    this.getTraining()
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
    width:13vw;
    max-height:2vw;
}
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
.header h2{
    text-align: center;
}

.header{
  height: 10vh;
}
#training-block{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  height: 90vh;
}
.footer{
  display: inline-flex;
  height: 10%;
  width: 100%;
  background-color: #333333;
   color: #ffffff;
}
.footer button{
  height: 50%;
}
.test-block{
  height: 90%;
  text-align: left;
  padding:30px;
}
#afsluiten-btn, #help-btn{
  margin: 10px;
}
#vorige-btn, #volgende-btn{
  margin: 10px;
}
#training-btn, #test-btn{
  margin-top: 20px;
}
.changePage-btn{
  width:20%;
}
</style>
