<template>
  <div class="training row">
        <div class="trainingimg">
            <img class="img-fluid" src= "@/assets/bollegraaf_background.jpg">
        </div>
        <div class="traininginfo">
            <span>Eindtoets: {{training}}</span>
            <hr>
            <div class="row">
                <div class="col-6">
                    <p>Vragen: 28</p>
                    <p>Onderdelen: 10</p>
                    <p>Tijdsduur: 10 minuten</p>
                </div>
                <div class="col-6">
                    <b-button>Start toets</b-button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: [
    'training',
    'followed'
  ],
  mounted(){
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
