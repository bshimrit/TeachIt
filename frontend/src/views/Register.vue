<template>
  <section class="RegisterPage container">
      <div>
          <h4>Register to Teach It</h4>
        <div class="row form-container">
            <form class="col s12" @submit.prevent="saveUser">
                <div class="row">
                    <div class="input-field col s12">
                        <label for="userName">User Name</label>
                        <input id="userName" v-model="newUser.userName" type="text" class="validate">
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <label for="fullName">full Name</label>
                        <input id="fullName" v-model="newUser.fullName" type="text" class="validate">
                    </div>
                </div>

                  <div class="row">
                    <div class="input-field col s12">
                      <input v-model="newUser.email" type="email" class="validate">
                      <label for="email">Email</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="newUser.password" type="password" class="validate">
                    <label for="password">Password</label>
                    </div>
                </div>

                 <div class="row">
                    <div class="input-field col s12">
                    <input type="password" class="validate">
                    <label for="password">Repeat Password</label>
                    </div>
                </div>

                 <div>
                  <input type="checkbox" v-model="newUser.isTeacher" id="isTeacher" />
                  <label for="isTeacher">I'm a teacher</label>
                </div>


                <div> <uploadImg @uploadImg="addImg"></uploadImg></div><br>
               
                <div>
                <button type="submit" class="waves-effect waves-light btn">Register</button>
                </div>
                
            </form>
        </div>
       
      </div>
      <h4> Already a member?</h4>
      <router-link class="waves-effect waves-light btn" to="/login">Login</router-link> <br>
  </section>
</template>

<script>
import UserService from "../services/UserService";
import UploadImg from '@/components/uploadImg/Upload.vue';

export default {
  name: "RegisterPage",
  data() {
    return {
      newUser: UserService.emptyUser()
    };
  },
  created() {
      this.newUser.img = './img/icons/default_user_icon.png'
      
  },
  methods: {
    saveUser() {
      console.log('newUser:',this.newUser);
      var userToAdd = this.newUser
      this.$store
        .dispatch({ type: "saveUser", user: this.newUser })
        .then(addedUser => {
          this.$store.dispatch({type: 'checkLogin', creds: {userName: userToAdd.userName, password: userToAdd.password}})
          window.alert("Success");
          this.$router.push("/");
        })
        .catch(err => {
           window.alert("Failed");
          console.log("failed:" + err);
        });
        this.newUser = UserService.emptyUser();
    },
    addImg(url) {
        this.newUser.img = url
        console.log('newUser:',this.newUser);
        
    }
  },
  computed: {},
  components: {
    UserService,
    UploadImg
    
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  padding: 20px;
}
.form-container {
  width: 80%;
  margin: 0 auto;
}
a {
  margin: 10px;
}
</style>
