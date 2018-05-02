import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMaterealize from "vue-materialize"
import 'font-awesome/css/font-awesome.css';
import axios from 'axios'

import _ from 'lodash'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
