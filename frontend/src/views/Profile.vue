<template>
  <div class="profile">

    <div class="user-info">
        <h1>{{user.name}} </h1>
        <img :src="user.img" alt="profile_img">
        <a :href="user.socialMedia.facebook">Facebook</a> |
        <a :href="user.socialMedia.twitter">Twitter</a>
        <h3>Rating: (computed avg rating)</h3>
        <h3>{{user.quote}}</h3>
        <p>      {{user.desc}}      </p>
        <p>  Education:    {{user.education}}      </p>
    </div>
       <div class="topic-container">
          <h3>Avaliable Classes:</h3>
                <table class="centered highlight">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Level</th>
                      <th>Price/Hour</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Development</td>
                        <td>Javascript</td>
                        <td>Beginner</td>
                        <td>100</td>
                    </tr>
                    <tr>
                      <td>Development</td>
                        <td>C#</td>
                        <td>Beginner</td>
                        <td>100</td>
                    </tr>
                  </tbody>
                </table>
       </div>
      
     <button class="waves-effect waves-light btn">Connect(open chat)</button>

     <topic-review></topic-review>

  </div>
</template>

<script>
// @ is an alias to /src
import TopicReview from '@/components/review/TopicReview.vue'
import UserService from '@/services/UserService.js'

export default {
  name: 'profile',
  data () {
    return {
      user: {name:'Dani Bern', img:'https://randomuser.me/api/portraits/men/43.jpg',quote:'Anyone Can Learn',desc:'Hi! I\'m Colt. I\'m a developer with a serious love for teaching. I\'ve spent the last few years teaching people to program at 2 different immersive bootcamps where I\'ve helped hundreds of people become web developers and change their lives. My graduates work at companies like Google, Salesforce, and Square.', education:'A Degree', socialMedia: {facebook:'http://f.com/user',twitter:'t.com/user'}}
    }
  },
  created() {
        var userId = this.$route.params.userId;
        console.log('userId', userId);
        UserService.getUserById(userId)
         .then(user => this.user = user)
         .catch(err => {
            console.log('err:', err);
             //this.$router.push('/')
         })
    },
  components: {
    TopicReview,
    UserService
  }
}
</script>


<style scoped>
div {
  border: 1px black solid;
}
</style>

