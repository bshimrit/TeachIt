<template>
  <div class="upload">
    <picture-input ref="pictureInput" @change="onChange" width="100" height="100" margin="16" accept="image/jpeg,image/png,image/jpg" size="10" :prefill="prefill" buttonClass="btn" :hideChangeButton="true" :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag an image file'
      }">
    </picture-input>
  </div>
</template>


<script>
import PictureInput from "vue-picture-input";

export default {
  name: "app",
  props: ["prefill", "imgPath"],
  created() {},
  data: function() {
    return {
      cloudinary: {
        uploadPreset: "wwdvysrn",
        apiKey: "327325116217457",
        cloudName: "dmz6eggte",
        clUrl: "https://api.cloudinary.com/v1_1/dmz6eggte/image/upload"
      },
      thumb: {
        url: ""
      },
      thumbs: []
    };
  },
  components: {
    PictureInput
  },

  methods: {
    onChange(image) {
      if (image) {
        this.upload();
        this.image = image;
      } else {
        console.log("No Image");
        // console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload() {
      let file = this.$refs.pictureInput.file;
      let formData = new FormData();
      formData.append("file", file.name);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");

      axios.post(this.cloudinary.clUrl, formData)
        .then(res => {
            if (res.status === 200) {
            console.log("upload success", res);
            this.$emit("uploadImg", res.data.secure_url);
            this.thumbs.unshift({url: res.data.secure_url});
          } else {
            console.info("res.status !== 200: ", res);
          }
        })
        .catch(err => {
            console.log("err: ", err);
          this.$emit(
            "uploadImg",
            this.imgPath + this.$refs.pictureInput.file.name
          );
        });
    }
  }
};
</script>

<style scoped>
.upload {
  margin-bottom: 20px;
}
</style>