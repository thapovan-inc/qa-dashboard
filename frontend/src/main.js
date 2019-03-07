import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

Vue.use(moment)

Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
