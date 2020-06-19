<template>
<div class="home">
    <Header />
    <div class="container-fluid">
		<div class="row">
			<div class="col-lg-7">
				<div class="trainingfollow">
					<h3>Mijn trainingen</h3>
					<hr>
					<b>{{ $t("message.followTraining") }}</b>
					<div class="trainingblock" v-for="item in filteredTraining" v-bind:key="item.training_id">
						<Training v-bind:training="item" ref="train"/>
					</div>					
					<router-link :to="{ name: 'Training'}" :tag="link">{{ $t("message.showTraining") }}</router-link>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="voortgang">
					<h3>Mijn voortgang</h3>
					<hr/>
					<Progress />
					<p>Bekijk de hele voortgang</p>
				</div>
				<div class="Eindtoetsen">
					<h3>Eindtoetsen</h3>
					<hr />
					<p>Er zijn eindtoetsen beschikbaar</p>
					<Quiz/>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// @ is an alias to /src
import Training from '@/components/homescreen/Training.vue'
import Progress from '@/components/homescreen/Progress.vue'
import Quiz from '@/components/homescreen/Quiz.vue'
import Header from '@/components/general/Header.vue'
import {HTTP} from '@/assets/scripts/http-common.js';

export default {
  name: 'Home',
  components: {
    Training,
    Progress,
    Quiz,
    Header
  },
  data: function(){
    return{
      trainingen: [],
      followed: []
    }
  },
  methods:{
    getTrainingen: function(){
		HTTP.get('training/user/'+localStorage.id_token)
			.then(response =>{
			this.trainingen = response.data.training
		})
    }
  },
	created(){
	},
	mounted(){
	this.getTrainingen()
		console.log(this.$refs)
		
		this.$i18n.locale = localStorage.language_code
	},
  computed: {
    filteredTraining: function(){
      var filtered = []
		var filteredIds = []
		for(var item in this.trainingen){
			if(!filteredIds.includes(this.trainingen[item].training_id)){
				filtered.push(this.trainingen[item])
				filteredIds.push(this.trainingen[item].training_id)
			}
			if(filtered.length == 4){
				break;  
			}
		}
		return filtered
        
    }
  },
}
</script>

<style scoped>
  .home{
    min-height: 100vh;
    text-align: left;
  }
  .home .container-fluid{
    background-color: #ffffff;
    min-height: 100vh;
  }
  .col-lg-7, .col-lg-5{
    padding-left: 40px;
    padding-right: 40px;
  }
  .trainingfollow, .trainingall{
    border-bottom: 1px solid rgba(33,33,33, 0.2);
    margin-bottom: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .trainingfollow > a{
    padding: 10px 0;
  }
	.voortgang{
    margin-bottom: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(33,33,33, 0.2);

	}
hr{
	border: 1px solid rgba(255,165,0, 1);
    border-bottom: 1px solid rgba(33,33,33, 0.2);
}
</style>