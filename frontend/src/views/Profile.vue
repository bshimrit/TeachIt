<template>
      <div class="container">
        <div class="row">
              <div class="col s4"> <img :src="user.img" alt="profile_img"></div>
              <div class="col s8"> <h1>{{user.name}} </h1>  <button class="waves-effect waves-light btn">Connect(open chat)</button></div>
         </div>
         <div class="row">
                <div class="col s6">
                  <p>Rating: (computed avg rating)</p>
                    <a :href="user.socialMedia.facebook">Facebook</a> |
                    <a :href="user.socialMedia.twitter">Twitter</a></div>
                <div class="col s6"> <p> {{user.desc}}</p></div>
         </div>
         <div class="row">
              <h3>Avaliable Classes:</h3>
               <TeacherTopicPreview></TeacherTopicPreview>
         </div>
       
         <div class="row">
               <topic-review></topic-review>
         </div>


      </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from '@/components/review/TopicReview.vue'
import UserService from '@/services/UserService.js'
import TeacherTopicPreview from '@/components/topic/TeacherTopicPreview.vue'

export default {
  name: 'profile',
  data () {
    return {
      user: {name:'Dani Bern', img:'https://randomuser.me/api/portraits/men/43.jpg',quote:'Anyone Can Learn',desc:'Hi! I\'m Colt. I\'m a developer with a serious love for teaching. I\'ve spent the last few years teaching people to program at 2 different immersive bootcamps where I\'ve helped hundreds of people become web developers and change their lives. My graduates work at companies like Google, Salesforce, and Square.', education:'A Degree', socialMedia: {facebook:'http://f.com/user',twitter:'t.com/user'}}
    }
  },
  created() {
        var userId = this.$route.params.userId;
        if (!userId) userId= "5ae973a5f8cdd2dafed7a1f0";
        console.log('userId', userId);
        UserService.getUserById(userId)
         .then(user => this.user = user)
         .catch(err => {
            console.log('err:', err);
           
         })
    },
  components: {
    TopicReview,
    UserService,
    TeacherTopicPreview
  },
   computed: {
    topics() {     
      return this.$store.getters.topicsForDisplay;
    }
  }
}
</script>


<style scoped>
/* div {
  border: 1px black solid;
} */
</style>

