import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import CKEditor from '@ckeditor/ckeditor5-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'

import 'bootstrap/scss/bootstrap.scss'
import ToggleSwitch from 'vuejs-toggle-switch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faUsers, faBookOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretRight, faUsers, faBookOpen, faFile)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(CKEditor)
Vue.use(ToggleSwitch)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
