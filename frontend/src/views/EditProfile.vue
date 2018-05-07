<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Profile - {{ userToUpdate.fullName}}</h4>
      <div class="row">
        <div class="col s4">
          
      <div class="collection">
        <a  class="collection-item"  @click="editSection = 'AccountEdit'">Account</a>
        <a class="collection-item"  @click="editSection = 'InfoEdit'">Public Profile</a>
        <a class="collection-item" @click="editSection = 'Upload'">Photo</a>
        <a class="collection-item" @click="editSection = 'TeacherTopicEdit'">Classes</a>
      </div>

      <!-- <button class="btn"  @click="editSection = 'TeacherTopicEdit'">Classes</button> -->
        </div>

        <form class="col s8" @submit.prevent="saveUser">
       
        <component :is="editSection" :userToUpdate="userToUpdate" />
        
        <button class="waves-effect waves-light btn">Save</button>

        </form>
      </div>
    </div>

<!-- <TeacherTopicEdit></TeacherTopicEdit> -->
  </section>
</template>

<script>
import UserService from "@/services/UserService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/profile/TopicEdit.vue";
import TeacherTopicEdit from "@/components/profile/TeacherTopicEdit";
import AccountEdit from "@/components/profile/AccountEdit";
import InfoEdit from "@/components/profile/InfoEdit";
import ImgEdit from "@/components/profile/ImgEdit";

export default {
  data() {
    return {
       userToUpdate: UserService.emptyUser(),
       editSection: 'InfoEdit',

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
    }
  },
 created() {
    this.userToUpdate ={...this.$store.getters.loggedUser};
   
  },
   computed: {
    
  
  },
  components: {
    UserService,
    TeacherTopic,
    TopicEdit,
    TeacherTopicEdit,
    AccountEdit,
    InfoEdit,
    ImgEdit
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


