import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
// import UserEdit from './views/UserEdit.vue'
// import ReviewEdit from './views/ReviewEdit.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/about', name: 'about', component: About},
    { path: '/search', name: 'search', component: Search},
    { path: '/login', name: 'login', component: Login},
    // { path: '/user/edit', name: 'user edit', component: UserEdit},
    // { path: '/review/edit', name: 'review edit', component: ReviewEdit},
    { path: '/profile/edit', name: 'edit', component: EditProfile},
    { path: '/profile/:userId', name: 'profile', component: Profile},
    
  ]
})
