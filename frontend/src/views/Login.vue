<template>
  <section class="loginPage container">
      <div class="container">
          <h4>Log in to Teach It</h4>
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
                    <button class="waves-effect waves-light btn" :disabled="!isValid">Submit</button>
                </div>
            </form>
        </div>
      </div>
      <h4>Not a member?</h4>
      <router-link class="waves-effect waves-light btn" to="/register">Sign up</router-link> <br>
      <!-- <a class="waves-effect waves-light btn">Return to home page</a> -->
      <div v-if="loggedInUser"></div>      
  </section>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "loginPage",
  data() {
    return {
      credentials: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    checkLogin() {
      var creds = this.credentials;
      this.$store.dispatch({ type: "checkLogin", creds }).catch(err => {
        this.$swal({
          type: "error",
          title: "Wrong Credentials"
        });
        console.log("failed:" + err);
      });
    }
  },
  computed: {
    loggedInUser() {
      if (this.$store.getters.loggedUser) {
        this.$router.push("/");
      }
    },
    isValid() {
      return (
        this.credentials.userName !== "" && this.credentials.password !== ""
      );
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  padding: 20px;
}
a {
  margin: 10px;
}
</style>
