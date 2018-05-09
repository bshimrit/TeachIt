<template>
    <section>
      <h5>Account</h5>
          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.userName" type="text" class="validate">
              <label class="left active" for="password">User Name</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.email" type="email" class="validate">
              <label class="left active" for="email">Email</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input v-model="userToUpdate.password" type="password" class="validate">
              <label class="left active" for="password">Password</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input type="password" class="validate">
              <label class="left active" for="password">Repeat Password</label>
            </div>
          </div>
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