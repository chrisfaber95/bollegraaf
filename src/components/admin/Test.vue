<template>
  <div class="training">
        <h2>Tests</h2>
        {{setting}}

        <p>https://froala.com/wysiwyg-editor/docs/concepts/</p>
        <p>https://github.com/moodleou/moodle-qtype_ddimageortext/</p>
        <p>https://seregpie.github.io/VueDragDrop/</p>
         <div v-if="setting=='list'">
            <div class="row" v-for="test in filteredTests" v-bind:key="test.id">
                <div class="col-1">
                    {{test.sId}}
                </div>
                <div class="col-2">
                    {{test.tName}}
                </div>
                <div class="col-2">
                    {{test.oName}}
                </div>
                <div class="col-2">
                    {{test.oTime}}
                </div>
                <div class="col-2">
                    {{test.sName}}
                </div>
                <div class="col-1">
                    <p>X</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {HTTP} from '@/components/http-common.js';
export default {
  name: 'HelloWorld',
  props: [
    'setting'
  ],
  data: function(){
    return{
        tests: []
    }
  },
  methods:{
      getTests: function(){
          HTTP.get('test')
          .then(response => {
            console.log(response.data)
            this.tests = response.data.test
            return response.data.test
          })
      },

  },
  mounted(){
      this.getTests();
 },
 computed:{
     filteredTests: function(){
         return this.tests
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
