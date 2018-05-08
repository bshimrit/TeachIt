import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import './registerServiceWorker'
import 'materialize-css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import 'font-awesome/css/font-awesome.css';

import * as VueGoogleMaps from 'vue2-google-maps'
import _ from 'lodash'
import './css/main.css'
// import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, '//localhost:3000', store);
Vue.config.productionTip = false


// This is needed for getting the session cookie via CORS
window.axios = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true
});

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyB7d8kBhgehre70mejgg7em2lNTk8g0p54',
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
  
      //// If you want to set the version, you can do so:
      // v: '3.26',
    },
  
    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,
  
    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  })

new Vue({
  router,
  store,
  sockets: {
      connect() {
          console.log('Connected to socket!');
      }
  },
  render: h => h(App)
}).$mount('#app')
