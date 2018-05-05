<template>
    <section>
        <input type="file" @change="onFileChanged">
        <button @click="onUpload">Upload!</button>

    </section>
</template>

<script>
export default {
  data() {
    return { selectedFile: null };
  },
  props: {},
  watch: {},
  computed: {},
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
    },
    onUpload() {
        // https://www.academind.com/learn/vue-js/snippets/image-upload/
      // Send as binary data
      axios.post("my-domain.com/file-upload", this.selectedFile);
      // Send as FormData
    //   const formData = new FormData();
    //   formData.append("myFile", this.selectedFile, this.selectedFile.name);
    //   axios.post("my-domain.com/file-upload", formData);
    }
  },

  components: {}
};
</script>

<style scoped>

</style>