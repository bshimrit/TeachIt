<template>
  <div class="container">
    <div class="row">
      <div class="card horizontal">
        <div class="card-image" style="padding: 10px; display: flex;">
          <img :src="user.img" style="align-self: baseline; margin-top: 15%;">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>{{user.name}}
              <span style="font-size: 28px;">4
                <i class="fa fa-star-o" aria-hidden="true"></i>
              </span>
            </h4>
            <div style="color: rgba(0,0,0,0.5)">
              <i>"{{user.quote}}"</i>
            </div>
            <p>{{user.description}}</p>
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

    <div class="row">
      <ul class="collection">
        <li>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="../../public/img/topics/topic7.png">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">Javascript
                <span style="font-size: 20px;">4
                  <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>
                <i style="float: right" class="fa fa-info" aria-hidden="true"></i>
              </span>
              <span style="float: unset; margin: 0px;" class="new badge" data-badge-caption="">Web Development</span>
              <br />
              <p>100$/Hour</p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">Description
                <i class="close material-icons right">close</i>
              </span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
            <div class="card-action">
              <a href="#">Schedule</a>
            </div>
          </div>
        </li>
      </ul>
    </div>

     <h3>Reviews:</h3>
     
  </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from "@/components/review/TopicReview.vue";
import UserService from "@/services/UserService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";

export default {
  name: "profile",
  data() {
    return {
      user: {
        name: "Dani Bern",
        img: "https://randomuser.me/api/portraits/men/43.jpg",
        quote: "Anyone Can Learn",
        description:
          "Hi! I'm Colt. I'm a developer with a serious love for teaching. I've spent the last few years teaching people to program at 2 different immersive bootcamps where I've helped hundreds of people become web developers and change their lives. My graduates work at companies like Google, Salesforce, and Square.",
        education: "A Degree",
        socialMedia: { facebook: "http://f.com/user", twitter: "t.com/user" }
      }
    };
  },
  created() {
    this.$store.dispatch({ type: "loadTeacherTopics" });
    var userId = this.$route.params.userId;
    if (!userId) userId = "5ae973a5f8cdd2dafed7a1f0";
    console.log("userId", userId);
    UserService.getUserById(userId)
      .then(user => (this.user = user))
      .catch(err => {
        console.log("err:", err);
      });
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic
  },
  computed: {
    topics() {
      return this.$store.getters.teacherTopicsForDisplay;
    },
    teacherTopics() {
      console.log(this.$store.getters.teacherTopicsForDisplay);
      return this.$store.getters.teacherTopicsForDisplay;
    }
  }
};
</script>


<style scoped>
.container {
  text-align: left;
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

