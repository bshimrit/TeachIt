<template>
  <section class="upload">
    <div class="field-body">
      <h5>Upload profile image:</h5>
      <div class="field">
        <div class="control">
          <div class="file">
            <label class="file-label">
              <input   type="file" accept="image/*"  class="form-control" v-on:change="upload($event.target.files)" multiple/>
                <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Upload an image </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Upload',
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
   };
 },
 computed: {
   clUrl: function() {
     return `https://api.cloudinary.com/v1_1/${
       this.cloudinary.cloudName
     }/upload`;
   }
 },
 methods: {
   addThumb () {
     this.thumbs.unshift(this.thumb);
   },
   upload (file) {
     const formData = new FormData();
     formData.append("file", file[0]);
     formData.append("upload_preset", this.cloudinary.uploadPreset);
     formData.append("tags", "gs-vue,gs-vue-uploaded");
     axios.post(this.clUrl, formData).then(res => {
       this.$emit('uploadImg' , res.data.secure_url);
       this.thumbs.unshift({
         url: res.data.secure_url
       });
     });
   }
 }
}


</script>

<style scoped>
  .field-body h5 {
    text-align: left
  }
</style>