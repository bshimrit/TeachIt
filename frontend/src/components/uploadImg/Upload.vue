<template>
   <div class="field-body">
     <h5>Upload profile image:</h5>
   <div class="field">
     <div class="control">
       <!-- <input class="input is-danger"  type="text" placeholder="Add your product title"> -->
         <div class="file">
          <label class="file-label">
                    <input   type="file" accept="image/*"  class="form-control" v-on:change="upload($event.target.files)" multiple/>
                   <span class="file-cta">
                   <span class="file-icon">
                   <i class="fas fa-upload"></i>
                   </span>
                   <span class="file-label">
                   Upload an image
               </span>
               </span>
           </label>
       </div>
     </div>
   </div>
 
   
 </div> 
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
     console.log(file[0], formData);
     // For debug purpose only
     // Inspects the content of formData
     for (var pair of formData.entries()) {
       console.log(pair[0] + ", " + pair[1]);
     }
     axios.post(this.clUrl, formData).then(res => {
       this.$emit('uploadImg' , res.data.secure_url);
       console.log (res);
       this.thumbs.unshift({
         url: res.data.secure_url
       });
     });
   }
 }
}


</script>

<style>

</style>