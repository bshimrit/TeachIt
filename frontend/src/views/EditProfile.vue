<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Edit Profile</h4>
      <div class="row">
        <form class="col s12" @submit.prevent="saveUser">
          <div class="row">
            <div class="input-field col s6">
              <input v-model="userToUpdate.firstName" type="text" class="validate">
              <label for="first_name">First Name</label>
            </div>
            <div class="input-field col s6">
              <input v-model="userToUpdate.lastName" type="text" class="validate">
              <label for="first_name">Last Name</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.email" type="email" class="validate">
              <label for="email">Email</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.password" type="password" class="validate">
              <label for="password">Password</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.img" type="text" class="validate">
              <label class="left" for="image">Image url</label>
             
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <textarea v-model="userToUpdate.desc" class="materialize-textarea"></textarea>
              <label class="left" for="desc">About me</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.education" type="text" class="validate">
              <label class="left" for="education">Education</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.quote" type="text" class="validate">
              <label class="left" for="education">Personal Quote</label>
            </div>
          </div>

          <div class="row">
            <h5 class="left-align">Links</h5>
            
          </div>

          <div class="row">
            <h5 class="left-align">Classes</h5>
          </div>

          <button class="waves-effect waves-light btn">Save</button>

        </form>
      </div>
    </div>

  </section>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  data() {
    return {
      showModal: false,
      userToUpdate: UserService.emptyUser()
    };
  },
  methods: {
    saveUser() {
      console.log(this.userToUpdate);
      this.$store.dispatch({type:'saveUser',user: this.userToUpdate})
          .then(addedUser => {
             console.log('added');
          })
          .catch(err => {
              console.log('failed:' + err);
          })
    }
  },
  components: {
    UserService
  }
};
</script>


<style scopped>
.container {
  width: 60%;
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
  margin: 10px;
}

</style>


