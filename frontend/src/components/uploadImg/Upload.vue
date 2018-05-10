<template>
  <div class="upload">    
    <picture-input 
      ref="pictureInput" 
      @change="onChange" 
      width="100" 
      height="100" 
      margin="16" 
      accept="image/jpeg,image/png,image/jpg" 
      size="10" 
      :prefill="prefill"
      buttonClass="btn"
      :hideChangeButton="true"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag an image file'
      }">
    </picture-input>
  </div>
</template>


<script>
import PictureInput from 'vue-picture-input'
 
export default {
  name: 'app',
  props:['prefill','imgPath'],
  created(){
  },
  data: function() {
   return {
     cloudinary: {
       uploadPreset: "wwdvysrn",
       apiKey: "327325116217457",
       cloudName: "dmz6eggte"
     },
     thumb: {
       url: ""
     },
     thumbs: []
   }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      if (image) {
        this.upload(image)
        this.image = image
      } else {
        // console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload (file) {
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("upload_preset", this.cloudinary.uploadPreset);
        formData.append("tags", "gs-vue,gs-vue-uploaded");
        axios.post(this.clUrl, formData)
          .then(res => {
          this.$emit('uploadImg' , res.data.secure_url);
          this.thumbs.unshift({
            url: res.data.secure_url
          })
        })
        .catch(err => {
          this.$emit('uploadImg' , this.imgPath + this.$refs.pictureInput.file.name);
        })
      }
    }
}
</script>

<style scoped>

  .upload {
    margin-bottom: 20px;
  }
</style>