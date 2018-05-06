<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Edit Profile</h4>
      <div class="row">
        <form class="col s12" @submit.prevent="saveUser">
          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.name" type="text" class="validate">
              <label for="name">Name</label>
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
              <!-- <input v-model="userToUpdate.img" type="text" class="validate">
              <label class="left" for="image">Image url</label> -->

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
           <topic-edit></topic-edit>
          </div>
          <div class="row">
            <div class="col s12 m3" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
              <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="true" :showTeacher="false"></TeacherTopic>
            </div>
          </div>
          <button class="waves-effect waves-light btn">Save</button>

        </form>
      </div>
    </div>

  </section>
</template>

<script>
import UserService from "@/services/UserService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/profile/TopicEdit.vue";

export default {
  data() {
    return {
     
      userToUpdate: UserService.emptyUser()
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
    TopicEdit
  }
};
</script>


<style scoped>
.container {
  width: 60%;
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
  margin: 10px;
}
</style>


