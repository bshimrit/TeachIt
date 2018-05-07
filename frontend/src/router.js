import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Topic from './views/Topic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/about', name: 'about', component: About},
    { path: '/search', name: 'search', component: Search},
    { path: '/search/:filter', name: 'searchFilter', component: Search},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/profile/teacher/:userId', name: 'profile', component: Profile},
    { path: '/profile/edit/:userId', name: 'edit', component: EditProfile},
    { path: '/profile/topic/:teacherTopicId', name: 'topic', component: Topic},
    
  ]
})
