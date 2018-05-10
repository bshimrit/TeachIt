<template>
  <section>
  <div v-if="teacherTopic.topic" class="container card-container">
    <div class="profile-card card flex">
      <div class="card-image" style="padding: 10px; display: flex;">
        <div class="user-img" :style="{backgroundImage: 'url(' + teacherTopic.topicImage + ')'}"></div>     
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h4>{{teacherTopic.topic.subtitle}}
              <StarRating v-model="reviewsAvg" :star-size="20" :read-only="true" :show-rating="false"/>
          </h4>
          <p>{{teacherTopic.pricePerHour}}$/PerHour</p>
          <p class="font-bold">{{teacherTopic.shortDes}}</p>
          <p>{{teacherTopic.longDes}}</p>
        </div>
      </div>
    </div>
    <div class="teacher-details flex">
        <div class="flex justift-start align-center">
          <a class="pointer" @click="goToTeacherProfile"><img class="profile margin-right20" :src="teacherTopic.teacher.img" /></a>
          <div class="font-bold margin-right20">{{teacher.fullName}}</div>
          <div class="margin-right20">"{{teacher.quote}}"</div>
        </div>
        <div>
          <SocialInfo :socialInfo="teacher.socialLinks"></SocialInfo>
        </div>
    </div>
    <div class="margin-top20 flex align-start">
      <DatePicker :date="startTime" :option="option" :limit="limit"></DatePicker>
      <button v-if="startTime.time" class="send-btn btn margin-left20" @click="openChat">Send</button>
    </div>
    <topic-review :teacherId="teacher._id" :teacherTopicId="$route.params.teacherTopicId"></topic-review>
     
  </div>
  </section>
</template>

<script>
// @ is an alias to /src
import TopicReview from "@/components/review/TopicReview.vue";
import SocialInfo from "@/components/SocialInfo.vue";
import UserService from "@/services/UserService.js";
import TeacherTopicService from "@/services/TeacherTopicService.js";
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import StarRating from "vue-star-rating";
import DatePicker from 'vue-datepicker'

export default {
  name: "profile",
  data() {
    return {
      teacher: {
      },
      teacherTopic: {
      },
      loggedUser: {},
      startTime: { time: ''},
      endtime: {time: ''},
      option: {
        type: 'min',
        week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: 'SCHEDULE',
        inputStyle: {
        },
        color: {
          header: '#0e0f10',
          headerText: '#e1d256'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: '2018-02-01',
        to: '2018-12-31'
      }]
    }
  },
  created() {
    var teacherTopicId = this.$route.params.teacherTopicId;
    this.$store.dispatch({ type: "getTeacherTopicById", teacherTopicId})
    .then((teacherTopic) => {
      this.teacher = teacherTopic[0].teacher;
      this.teacherTopic = teacherTopic[0];
    });
    this.loggedUser = this.$store.getters.loggedUser
  },
  computed: {
      reviewsAvg(){
        return this.$store.getters.reviewsAvgDispaly;
      }
    },
  methods: {
    goToTeacherProfile(){
      this.$router.push('/profile/user/' + this.teacherTopic.teacherId);
        },
    openChat() {
        var msg = this.$store.getters.newMsg;
        console.log('sending chat to:', msg);
        msg.txt = `Hello ${this.teacher.fullName}. 
        You got a class request for the date ${this.startTime.time}, from ${this.loggedUser.fullName}.`
        msg.senderId = this.loggedUser._id;
        msg.senderName = this.loggedUser.fullName;
        msg.recipientId = this.teacher._id;
        var sortedIds = [this.loggedUser._id, msg.recipientId].sort();
        msg.roomId = sortedIds[0] + sortedIds[1];        
        console.log(msg);       
        this.$socket.emit('chat newMessage', msg);
        
    }
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic,
    StarRating,
    DatePicker,
    SocialInfo
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

.date-picker {
  width: 30%;
}

.card-container {
  margin-top: 50px;
}

.send-btn{
  height: 58px;
}

.teacher-details {
  flex-direction: column;
  align-items:start;
  justify-content: start;
}


 .card .card-content {
    padding:10px;
  }

@media (min-width: 750px){
  .teacher-details {
    flex-direction: row;
    align-items: center;
}
  
}

</style>

