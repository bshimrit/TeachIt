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
import VueMq from 'vue-mq'
import VuejsDialog from "vuejs-dialog"
import VueSweetalert2 from 'vue-sweetalert2';
import * as VueGoogleMaps from 'vue2-google-maps'
import _ from 'lodash'
import './css/main.css'
// import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io';
 
Vue.use(VueSweetalert2);

// Tell Vue to install the plugin.
Vue.use(VuejsDialog, {
  html: true, 
  loader: true,
  okText: 'Proceed',
  cancelText: 'Cancel',
  animation: 'bounce', 
})


const baseURL = (process.env.NODE_ENV !== 'development')? '' : '//127.0.0.1:3000'
const socketURL = (process.env.NODE_ENV !== 'development')? '/' : '//127.0.0.1:3000'

Vue.use(VueSocketio, socketURL, store);
Vue.config.productionTip = false


// This is needed for getting the session cookie via CORS
window.axios = axios.create({
  baseURL,
  withCredentials: false
});

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 750,
    md: 1025,
    lg: Infinity,
  }
})

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
