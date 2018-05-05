<template>
    <section>

      <div class="row">
        <div class="col s12">
          <div class="input-field inline">
            <input v-model="socialMedia.facebook" type="text" class="validate">
            <label>Facebook</label>
          </div>
        </div>
      </div>

    </section>
</template>

<script>
export default {
  data() {
    return {
        socialMedia: {facebook:'',twitter:'',linkedin:'',youtube:''},
    };
  },
  props: {},
  watch: {},
  computed: {},
  methods: {},
  components: {}
};
</script>

<style scoped>

</style>