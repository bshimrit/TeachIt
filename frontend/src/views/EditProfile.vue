<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Profile</h4>
      <div class="row">
        <div class="col s4">
          
      <div class="collection">
        <a href="#!" class="collection-item">Account</a>
        <a href="#!" class="collection-item active">Public Profile</a>
        <a href="#!" class="collection-item" @click="editSection = ''">Photo</a>
         <div class="collection-header"><h5>Teacher</h5></div>
        <a href="#!" class="collection-item" @click="editSection = ''">Classes</a>
      </div>
        </div>

        <!-- <component :is="editSection" class="col s8" /> -->

        <form class="col s8" @submit.prevent="saveUser">

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.userName" type="text" class="validate">
              <label for="password">User Name</label>
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
              <input v-model="userToUpdate.fullName" type="text" class="validate">
              <label for="name">Full Name</label>
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
              <label class="left">Education</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.quote" type="text" class="validate">
              <label class="left">Personal Quote</label>
            </div>
          </div>

          <div class="row">
            <h5 class="left-align">Links</h5>
              <div class="input-field col s12">
                <input v-model="userToUpdate.socialLinks.facebook" type="text" class="validate">
                <label class="left">Facebook</label>
              </div>
                <div class="input-field col s12">
                <input v-model="userToUpdate.socialLinks.twitter" type="text" class="validate">
                <label class="left">Twitter</label>
              </div>
          </div>
       
          <button class="waves-effect waves-light btn">Save</button>

        </form>
      </div>
    </div>

<TeacherTopicEdit></TeacherTopicEdit>
  </section>
</template>

<script>
import UserService from "@/services/UserService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/profile/TopicEdit.vue";
import TeacherTopicEdit from "@/components/profile/TeacherTopicEdit";

export default {
  data() {
    return {
      userToUpdate: UserService.emptyUser(),
      editSection: ''
    };
  },
  methods: {
    saveUser() {
      console.log(this.userToUpdate);
      this.$store
        .dispatch({ type: "saveUser", user: this.userToUpdate })
        .then(addedUser => {
          console.log("added");
        })
        .catch(err => {
          console.log("failed:" + err);
        });
    }
  },
  created() {
    this.$store.dispatch({ type: "loadTeacherTopics" });
   
  },
   computed: {
   
    teacherTopics() {
      console.log(this.$store.getters.teacherTopicsForDisplay);
      return this.$store.getters.teacherTopicsForDisplay;
    }
  },
  components: {
    UserService,
    TeacherTopic,
    TopicEdit,
    TeacherTopicEdit
  }
};
</script>


<style scoped>
.container {
  max-width: 900px;
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
  margin: 10px;
}
</style>


