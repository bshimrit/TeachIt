<template>
    <section>
     <h5>Public Profile</h5>
          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.fullName" type="text" class="validate">
              <label for="name" class="left active">Full Name</label>
            </div>
           
          </div>

          <div class="row">
            <div class="input-field col s12">
              <textarea v-model="userToUpdate.desc" class="materialize-textarea"></textarea>
              <label  class="left active" for="desc">About me</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.education" type="text" class="validate">
              <label class="left active">Education</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.quote" type="text" class="validate">
              <label  class="left active">Personal Quote</label>
            </div>
          </div>

          <!-- <div class="row">
            <h5 class="left-align">Links</h5>
              <div class="input-field col s12">
               
                <input v-model="userToUpdate.socialLinks.facebook" type="text" class="validate">
                <label  class="left active">Facebook</label>
              </div>
                <div class="input-field col s12">
                <input v-model="userToUpdate.socialLinks.twitter" type="text" class="validate">
                <label class="left active">Twitter</label>
              </div>
          </div> -->

    </section>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
   props: ['userToUpdate'],
  watch: {},
  computed: {},
  methods: {},
  components: {}
};
</script>

<style scoped>

</style>