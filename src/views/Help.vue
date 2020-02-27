<template>
  <div class="help">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Help</h2>
        <div class="help-block">
            <h4>Trainingsprogramma ....</h4>
            <div> <p>*******Voortgang*********</p></div>
            <h4>Onderdelen</h4>
            <p>Onderdeel *******Voortgang*********</p>
            <p>Subonderdeel *******Voortgang*********</p>
        </div>
     </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import Trainingitem from '@/components/Trainingitem.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
      Header
  },
  data: function(){
    return{
    }
  }
}
</script>

<style scoped>
.help .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
    display: inline-flex;
}

.help .container-fluid>.row{
    min-height: 100vh;
}
.help{
    min-height: 100vh;
}
.pagetitle{
    border-bottom: 1px solid orange;
    text-align: start;
}
.help-block{
    padding: 15px;
    margin: 15px;
    text-align: start;
    width: 50%;
}
</style>