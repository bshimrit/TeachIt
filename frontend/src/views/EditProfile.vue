<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Profile - {{ userToUpdate.fullName}}</h4>
      <div class="row">
        <div class="col s4">
          <div class="collection">
            <a class="collection-item" @click="editSection = 'AccountEdit'">Account</a>
            <a class="collection-item" @click="editSection = 'InfoEdit'">Public Profile</a>
            <a class="collection-item" @click="editSection = 'Upload'">Photo</a>
            <a class="collection-item" @click="goToClasses">Classes</a>
          </div>
        </div>

        <div class="col s8">
          <form v-if="editSection !== 'Classes'" @submit.prevent="saveUser">
            <component :is="editSection" :userToUpdate="userToUpdate" />
            <button type="submit" class="waves-effect waves-light btn">Save</button>
          </form>

         
        </div>

      </div>

    </div>

  </section>
</template>

<script>
import UserService from "@/services/UserService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TeacherTopicEdit from "@/components/topic/TeacherTopicEdit.vue";
import TeacherTopicList from "@/components/topic/TeacherTopicList";
import AccountEdit from "@/components/profile/AccountEdit";
import InfoEdit from "@/components/profile/InfoEdit";
import Upload from "@/components/uploadImg/Upload";

export default {
  data() {
    return {
      editSection: "InfoEdit",
      userId:this.$route.params.userId 
    };
  },
  methods: {
    saveUser() {
      this.$store
        .dispatch({ type: "saveUser", user: this.userToUpdate })
        .then(addedUser => {
          window.alert("Updated");
          console.log("added");
        })
        .catch(err => {
          window.alert("Failed");
          console.log("failed:" + err);
        });
    },
    goToClasses() {
      this.$router.push("/profile/classes/edit/" + this.userId);
    },
  },
  created() {},
  computed: {
    userToUpdate() {
      let loggedUser = this.$store.getters.loggedUser;
      return loggedUser ? { ...loggedUser } : UserService.emptyUser();
    }
  },
  components: {
    UserService,
    TeacherTopic,
    TeacherTopicList,
    TeacherTopicEdit,
    AccountEdit,
    InfoEdit,
    Upload
  }
};
</script>


<style scoped>
.container {
  /* max-width: 900px; */
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
  margin: 10px;
  cursor: pointer;
}
</style>


