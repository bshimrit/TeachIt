<template>
  <section class="loginPage">
      <div class="container">
          <h4>Log in to Teacht It</h4>
        <div class="row">
            <form class="col s12" @submit.prevent="checkLogin">
                <div class="row">
                    <div class="input-field col s12">
                        <label for="userName">User name</label>
                        <input id="userName" v-model="credentials.userName" type="text" class="validate">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="credentials.password" type="password" class="validate" placeholder="Password">
                    </div>
                    <button class="waves-effect waves-light btn">Submit</button>
                </div>
            </form>
        </div>
      </div>
      <h4>Not a member?</h4>
      <router-link class="waves-effect waves-light btn" to="/profile/edit">Sign up</router-link> <br>
      <!-- <a class="waves-effect waves-light btn">Return to home page</a> -->
      <div v-if="loggedInUser"></div>      
  </section>
</template>

<script>
import UserService from '../services/UserService'

export default {
    name: 'loginPage',
    data() {
        return {
            credentials: {
                userName: 'Oz',
                password: '1234'
            }
        }
    },
    methods: {
        checkLogin() {
            var creds = this.credentials
            console.log('Sending credentials');
            this.$store.dispatch({type: 'checkLogin', creds})
            // setTimeout(()=>{
            //     if (this.$store.getters.loggedUser) this.$router.push('/')
            // },0)
        // if (this.$store.getters.loggedUser) this.$router.push('/')
        }
    },
    computed: {
        loggedInUser() {
            if (this.$store.getters.loggedUser) {
                this.$router.push('/')
                // return this.$store.getters.loggedUser || {name:''}
            }
        }
    }
};
</script>

<style scopped>
.container {
  width: 50%;
  border: 2px solid #577594;
  padding: 20px;
}
a {
    margin: 10px
}
</style>
