<template>
  <section class="topic-preview">
      <div class="row">
            <div v-for="topic in topics" :key="topic._id" class="col s12 m3">
                <div class="card">
                    <div class="card-image">
                    <img src="../../assets/topics/matha.jpg">
                    <span class="card-title">{{topics.title}}</span>
                    <a class="btn-floating halfway-fab waves-effect waves-light red btn-large"><img src="../../assets/users/1.jpg" /></a>
                    </div>
                    <h5>Teacher Name</h5>
                    <div class="card-content">
                    <StarRating :star-size=30 :increment=0.1 v-model="rating" :read-only="true" :show-rating="false"/>
                    <h4>Topic</h4>
                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import StarRating from 'vue-star-rating'
export default {
    props: ['topics'],
    data(){
        return {
            rating: 3
        }
    },
    computed: {
    },
    components: {
        StarRating
    }
}
</script>

<style scoped>
    .btn-floating.btn-large {
        top: -30px;
        width: 80px;
        height:80px;
    }
    .topic-preview {
        max-width: 100%;
    }
</style>
