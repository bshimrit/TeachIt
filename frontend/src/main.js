import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import './registerServiceWorker'
import "vue-materialize"
import 'font-awesome/css/font-awesome.css';


Vue.config.productionTip = false


// This is needed for getting the session cookie via CORS
window.axios = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
