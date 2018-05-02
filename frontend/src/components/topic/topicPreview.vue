<template>
  <section>
      <div class="row">
            <div v-for="topic in topics" :key="topic._id" class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                    <img src="logo.png">
                    <span class="card-title">{{topics.title}}</span>
                    <a class="btn-floating halfway-fab waves-effect waves-light red"><img src="logo.png" /></a>
                    </div>
                    <div class="card-content">
                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        topics() {     
            return this.$store.getters.topicsForDisplay;
        }
    }
}
</script>

<style>

</style>
