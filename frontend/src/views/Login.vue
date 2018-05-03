<template>
  <section class="loginPage">
      <div class="container">
          <h4>Log in to Teacht It</h4>
        <div class="row">
            <form class="col s12" @submit.prevent="checkLogin">
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="credentials.userName" type="text" class="validate" placeholder="User Name">
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
      logged in user: {{loggedInUser.userName}}
      <h4>Not a member?</h4>
      <a class="waves-effect waves-light btn">Sign up</a> <br>
      <!-- <a class="waves-effect waves-light btn">Return to home page</a> -->
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
            console.log('Sending credentials', creds);
            
            this.$store.dispatch({type: 'checkLogin', creds})
        }
    },
    computed: {
        loggedInUser() {
            console.log('user from store:',this.$store.getters.loggedUser );
            
            return this.$store.getters.loggedUser || {name:''}
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
