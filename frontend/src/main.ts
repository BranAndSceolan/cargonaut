import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faPlus, faPen, faTrash, faUser, faCircleDot, faStar, faMagnifyingGlass, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'

library.add(faAngleDown, faPlus, faPen, faTrash, faUser, faFacebook, faTwitter,
  faYoutube, faCircleDot, faStar, faMagnifyingGlass, faTriangleExclamation)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
