<template>
  <section class="EditClassesPage">
    <div class="container">
      <div class="row">
        <!-- <div class="col s3">
          <div class="collection">
            <a class="collection-item" @click="goToPublicProfile">View Public Profile</a>
            <a class="collection-item" @click="goToEditProfile">Manage Profile</a>
          </div>
        </div> -->
         <div class="col s9">
          <TeacherTopicList></TeacherTopicList>
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
      userId: this.$route.params.userId,
     
    };
  },
  methods: {
   
     goToPublicProfile() {
      this.$router.push("/profile/user/" + this.userId);
    },
     goToEditProfile() {
      this.$router.push("/profile/edit/" + this.userId);
    }
  },
  created(){
           
        
    },
  computed: {
   
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


