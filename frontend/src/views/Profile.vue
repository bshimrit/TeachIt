<template>
  <div class="container card-container">
    <div class="row">
      <div class="card horizontal">
        <div class="card-image flex flex-column justify-start" style="padding: 10px; display: flex;">
          <a class="edit-profile-btn pointer" v-if="isEditAllowed" @click="goToEditProfile">Edit profile</a>
          <img :src="user.img" style="align-self: baseline; margin-top: 15%;">
          <div style="margin-top: 20px;">
            <a class="margin-right20" href="#">
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a class="margin-right20">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a class="margin-right20">
              <i class="fa fa-telegram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>{{user.fullName}}</h4>
            <StarRating v-model="teacherTopic.rating" :star-size="20" :read-only="true" :show-rating="false"/>
            <div style="color: rgba(0,0,0,0.5)">
              <i>"{{user.quote}}"</i>
            </div>
            <p>{{user.desc}}</p>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn">
              Contact Me!</a>
          </div>
        </div>
      </div>
    </div>
    <p class="font-bold">Classes</p>
    <div class="row">
      <div class="col s12 m3" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
        <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="true" :showTeacher="false"></TeacherTopic>
      </div>
    </div>

     <topic-review :teacherId="userId"></topic-review>
  </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from "@/components/review/TopicReview.vue";
import UserService from "@/services/UserService.js";
import TeacherTopicService from "@/services/TeacherTopicService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import StarRating from "vue-star-rating";

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
    this.$store
      .dispatch({ type: "getUserById", userId:this.userId })
      .then(user => {
          this.user = user;
        })
      .catch(err => {
        console.log("err:", err);
      });
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic,
    StarRating,
  },
  methods: {
    goToEditProfile() {
      this.$router.push("/profile/edit/" + this.userId);
    }
  },
  computed: {
    isEditAllowed() {
      return (
        this.$store.getters.loggedUser &&
        this.$store.getters.loggedUser._id === this.userId
      );
    },
    teacherId() {
        return this.$route.params.userId
    },
  }
};
</script>


<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  border: none;
}
li {
  text-align: left;
}

.edit-profile-btn:hover {
  color: blue;
}
</style>

