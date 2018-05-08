<template>
  <section>
  <div v-if="teacherTopic.topic" class="container card-container">
      <div class="card horizontal">
        <div class="card-image" style="padding: 10px; display: flex;">
          <img :src="teacherTopic.topicImage" style="align-self: baseline; margin-top: 15%;">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>{{teacherTopic.topic.subtitle}}
               <StarRating v-model="teacherTopic.rating" :star-size="20" :read-only="true" :show-rating="false"/>
            </h4>
            <p>{{teacherTopic.pricePerHour}}$/PerHour</p>
            <p class="font-bold">{{teacherTopic.shortDes}}</p>
            <p>{{teacherTopic.longDes}}</p>
          </div>
        </div>
      </div>
    <div class="flex justift-start align-center">
        <a class="pointer" @click="goToTeacherProfile"><img class="profile margin-right20" :src="teacherTopic.teacher.img" /></a>
        <div class="font-bold margin-right20">{{teacher.fullName}}</div>
        <div class="margin-right20">"{{teacher.quote}}"</div>
        <a class="margin-right20" href="#">
            <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a class="margin-right20">
            <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
        <a>
            <i class="fa fa-telegram" aria-hidden="true"></i>
        </a>
    </div>
    <div class="flex align-start">
      <DatePicker :date="startTime" :option="option" :limit="limit"></DatePicker>
      <button v-if="startTime.time" class="waves-effect waves-light send-btn btn margin-left20">Send</button>
    </div>
    <topic-review :teacherId="teacher._id" :teacherTopicId="$route.params.teacherTopicId"></topic-review>
     
  </div>
  </section>
</template>

<script>
// @ is an alias to /src
import TopicReview from "@/components/review/TopicReview.vue";
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
          header: '#26a69a',
          headerText: '#fff'
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
    this.$store.dispatch({ type: "loadTeacherTopics" });
    if (this.$route.params.teacherTopicId) {
      var teacherTopicId = this.$route.params.teacherTopicId;

      TeacherTopicService.getTeacherTopicById(teacherTopicId)
        .then(teacherTopic => {
            this.teacher = teacherTopic[0].teacher;
            this.teacherTopic = teacherTopic[0];
        })
        .catch(err => {
          console.log("err:", err);
        });
    }
  },
  computed: {
    },
  methods: {
    goToTeacherProfile(){
      this.$router.push('/profile/teacher/' + this.teacherTopic.teacherId);
        },
  },
  components: {
    TopicReview,
    UserService,
    TeacherTopic,
    StarRating,
    DatePicker
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



</style>

