<template>
  <div class="container card-container">
    <div class="row">
      <a class="edit-profile-btn pointer" v-if="isEditAllowed" @click="goToEditProfile">Edit profile</a>
      <div class="profile-card card flex">
        <div class="card-image flex flex-column justify-start" style="padding: 10px; display: flex;">
          <div class="user-img" :style="{backgroundImage: 'url(' + user.img + ')'}"></div>          
          <div>
            <SocialInfo class="margin-top20" :socialInfo="user.socialLinks"></SocialInfo>
          </div>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>{{user.fullName}}</h4>
            <StarRating v-if="user.isTeacher" v-model="reviewsAvg" :star-size="20" :read-only="true" :show-rating="false"/>
            <div v-if="user.quote">"{{user.quote}}"</div>
            <p>{{user.desc}}</p>
          </div>
          <div class="card-action">
            <button class="waves-effect waves-light btn" @click="openChat">Contact Me!</button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="user.isTeacher" class="font-bold">Classes</p>
    <div v-if="user.isTeacher" class="row">
      <div class="flex col" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
          <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
      </div>
    </div>
     <topic-review v-if="user.isTeacher" :teacherId="userId"></topic-review>
  </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from '@/components/review/TopicReview.vue';
import SocialInfo from '@/components/SocialInfo.vue';
import UserService from '@/services/UserService.js';
import TeacherTopicService from '@/services/TeacherTopicService.js';
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue';
import StarRating from 'vue-star-rating';

export default {
  name: 'profile',
  data() {
    return {
      user: UserService.emptyUser(),
      teacherTopics: [],
      userId: this.$route.params.userId,
    };
  },
  created() {
    this.$store
      .dispatch({ type: 'getUserById', userId:this.userId })
      .then(user => {
          this.user = user;
          if (user.isTeacher){
            this.$store.dispatch({ type: 'getTopicsByTeacherId', teacherId: this.userId})
              .then((teacherTopics) => {
                this.teacherTopics = teacherTopics;
            })
          }
        })
      .catch(err => {
        console.log('err:', err);
      });
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic,
    StarRating,
    SocialInfo
  },
  methods: {
    goToEditProfile() {
      this.$router.push('/profile/edit/' + this.userId);
    },
    openChat() {
        console.log('Sending chat request for:', this.userId);
        
        this.$store.commit({type: 'chatWith', userId: this.userId})
        var msg = this.$store.getters.newMsg;
        msg.recipientId = this.userId;
        msg.senderId = this.loggedUser._id;
        msg.senderName = this.loggedUser.fullName;
        var sortedIds = [this.loggedUser._id, msg.recipientId].sort();
        msg.roomId = sortedIds[0] + sortedIds[1];        
        this.$store.commit({type: 'startNewChat', details: msg})
        // var msg = this.$store.getters.newMsg;
        // console.log('sending chat to:', msg);
        // msg.txt = `Hello ${this.teacher.fullName}. 
        // You got a class request for the date ${this.startTime.time}, from ${this.loggedUser.fullName}.`
        // msg.senderId = this.loggedUser._id;
        // msg.senderName = this.loggedUser.fullName;
        // msg.recipientId = this.user._id;
        // console.log(msg);       
        // this.$socket.emit('chat newMessage', msg);
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
    reviewsAvg(){
      return this.$store.getters.reviewsAvgDispaly;
    },
    loggedUser() {
        return this.$store.getters.loggedUser
    }
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

  .card-container {
    margin: 60px auto 0;
  }

  .card-action {
    padding: 10px;
  }

</style>

