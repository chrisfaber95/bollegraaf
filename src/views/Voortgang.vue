<template>
  <div class="voortgang">
    <Header />
    <div class="container-fluid">
        <h2 class="pagetitle">Voortgang</h2>
        <div class="voortgang-block">
            <h4>Trainingsprogramma ....</h4>
            <div> <p>*******Voortgang*********</p></div>
            <h4>Onderdelen</h4>
            <p>Onderdeel *******Voortgang*********</p>
            <p>Subonderdeel *******Voortgang*********</p>
        </div>
        <div class="voortgang-block">
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
.voortgang .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
    display: inline-flex;
}

.voortgang .container-fluid>.row{
    min-height: 100vh;
}
.voortgang{
    min-height: 100vh;
}
.pagetitle{
    border-bottom: 1px solid orange;
    text-align: start;
}
.voortgang-block{
    padding: 15px;
    margin: 15px;
    text-align: start;
    width: 50%;
}
</style>