import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
<<<<<<< HEAD
import VueMaterealize from "vue-materialize"
=======
import VueMaterealize from 'vue-materialize'
>>>>>>> 91e3b7c6087e43bf99681e27f21f5282ae062794
import 'font-awesome/css/font-awesome.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
