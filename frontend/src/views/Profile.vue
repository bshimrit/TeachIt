<template>
  <div class="container">
    <div class="row">
      <div class="card horizontal">
        <div class="card-image" style="padding: 10px; display: flex;">
          <img :src="user.img" style="align-self: baseline; margin-top: 15%;">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>
              {{user.fullName}}
               <StarRating v-model="teacherTopic.rating" :star-size="15" :read-only="true" :show-rating="false"/>
            </h4>
            <button v-if="isEditAllowed" @click="goToEditProfile" class="btn blue">Edit</button>
            <div style="color: rgba(0,0,0,0.5)">
              <i>"{{user.quote}}"</i>
            </div>
            <p>{{user.desc}}</p>
            <div style="margin-top: 20px;">
              <a href="#">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a>
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a>
                <i class="fa fa-telegram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn">
              Contact Me!</a>
          </div>
        </div>
      </div>
    </div>
    <h3>What I Teach:</h3>
    <div class="row">
      <div class="col s12 m3" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
        <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="true" :showTeacher="false"></TeacherTopic>
      </div>
    </div>

     <topic-review :userId="teacherId"></topic-review>
     <uploadImg></uploadImg>
  </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from "@/components/review/TopicReview.vue";
import UserService from "@/services/UserService.js";
import TeacherTopicService from "@/services/TeacherTopicService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import StarRating from "vue-star-rating";
import UploadImg from '@/components/uploadImg/Upload.vue';

export default {
  name: "profile",
  data() {
    return {
      user: UserService.emptyUser(),
      teacherTopic: {
        rating: 0
      },
      userId: this.$route.params.userId,
      teacherTopics: null
    };
  },
  created() {
    // if (!this.userId) this.userId = "5ae972d2f8cdd2dafed7a1ec";
    this.$store
      .dispatch({ type: "getUserById", userId:this.userId })
      .then(user => (this.user = user))
      .catch(err => {
        console.log("err:", err);
      });
    //   this.$store
    //   .dispatch({ type: "getTopicsByTeacherId", teacherId: this.userId })
    //   .then(topics => {
    //     console.log(topics);
    //     this.teacherTopics = topics;
    //   });
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic,
    StarRating,
    UploadImg
  },
  methods: {
    goToEditProfile() {
      this.$router.push("/profile/edit/" + this.userId);
    }
  },
  computed: {
    // topics() {
    //   return this.$store.getters.teacherTopicsForDisplay;
    // },
    isEditAllowed() {
      return (
        this.$store.getters.loggedUser &&
        this.$store.getters.loggedUser._id === this.userId
      );
    },
    teacherId() {
        return this.$route.params.userId
    }
    // teacherTopics() {
    //   console.log('users:');
    //   return this.$store.getters.teacherTopicsForDisplay.filter(
    //     topic => topic.teacherId === this.userId
    //   );
    // }
  }
};
</script>


<style scoped>
.container {
  text-align: left;
  max-width: 900px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  border: none;
}
li {
  text-align: left;
}
</style>

