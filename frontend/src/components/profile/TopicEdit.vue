<template>
<section>
 <h4>Add Class</h4>
                <div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                      <label class="left active">TopicId</label>
                    </div>
                    </div>
                  <!-- <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                      <label class="left active">Title</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Subtitle</label>
                    </div>
                  </div> -->
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea class="materialize-textarea"></textarea>
                        <label class="left active">Description</label>
                    </div>
                  </div>
                   <div class="row">
                    <div class="input-field col s12">
                       <input type="text" class="validate">
                        <label class="left active">Level</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="number" class="validate">
                        <label class="left active">Price/Hour</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Image url</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Address</label>
                    </div>
                  </div>

                  <button class="btn green accent-3">Add Class</button>
                </div> 

</section>
</template>

<script>
export default {
  data() {
    return {
      lessonToUpdate: {name:'a'}
    };
  },
  props: {
    lesson: {
      type: Object
    }
  },
  watch: {},
  computed: {},
  methods: {
    saveClass() {
     console.log('lesson', this.lessonToUpdate);
      // this.$store
      //   .dispatch({ type: "saveTeacherTopic", teacherTopic: this.class })
      //   .then(added => {
      //       window.alert("Updated");
      //     console.log("added");
      //   })
      //   .catch(err => {
      //      window.alert("Failed");
      //     console.log("failed:" + err);
      //   });
    }
  },
  components: {}
};
</script>

<style scoped>

</style>