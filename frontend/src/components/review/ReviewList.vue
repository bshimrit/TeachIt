<template>

      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="img\icons\android-chrome-192x192.png" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
           
            </div>
            <div class="col s10">
              <span class="black-text">
              <p>Review: {{review.text}}</p>
              <p>Rate: {{review.rate}}</p>
            
              <span v-for="n in 5" :key="n.id"
                    class="star" 
                    :class="{unstar: n > review.rate}" 
                    @click="updateStar(n)">
              </span>

                <p> 
                    Reviewer: {{review.fullName}}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },
  components: {
   
  }
}
</script>


<style scoped>
div {
  border: 1px black solid;
}
</style>

