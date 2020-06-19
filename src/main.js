import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'

import CKEditor from '@ckeditor/ckeditor5-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'

import 'bootstrap/scss/bootstrap.scss'
import ToggleSwitch from 'vuejs-toggle-switch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faUsers, faBookOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import translationFile from './assets/translate.js';
const translations = translationFile
console.log(translations)
library.add(faCaretRight, faUsers, faBookOpen, faFile)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(CKEditor)
Vue.use(ToggleSwitch)
Vue.use(VueI18n)


const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'nl',
	messages: translations
})

console.log(i18n)
//global.$ = $

new Vue({
  router,
  store,
	i18n,
  render: h => h(App)
}).$mount('#app')
