<template>
  <section class="EditProfilePage">
    <div class="container">
      <h4>Profile - {{ userToUpdate.fullName}}</h4>
      <section class="edit-container flex">
        <div class="menu">
          <div class="collection">
            <a class="collection-item" :class="{ active: editSection === 'AccountEdit' }" @click="editSection = 'AccountEdit'">Account</a>
            <a class="collection-item" :class="{ active: editSection === 'InfoEdit' }" @click="editSection = 'InfoEdit'">Public Profile</a>
            <a class="collection-item" :class="{ active: editSection === 'Upload' }" @click="editSection = 'Upload'">Photo</a>
            <a class="collection-item" :class="{ active: editSection === 'EditClasses' }" @click="editSection = 'EditClasses'">
              {{isTeacherClasses}}</a>
          </div>
        </div>
        <div class="content">
          <form v-if="editSection !== isTeacherClasses" @submit.prevent>
             <component :is="editSection" :userToUpdate="userToUpdate" :imgPath="imgPath" :prefill="userToUpdate.img" @uploadImg="addImg" />
            <button v-if="editSection !== 'EditClasses'" type="button" class="waves-effect waves-light btn"  @click="saveUser">Save</button>
           
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import UserService from "@/services/UserService.js";
import AccountEdit from "@/components/profile/AccountEdit";
import InfoEdit from "@/components/profile/InfoEdit";
import EditClasses from "@/views/EditClasses";
import Upload from "@/components/uploadImg/Upload";

export default {
  data() {
    return {
      editSection: "InfoEdit",
      userId: this.$route.params.userId,
      imgPath: "./img/users/",
      isTeacherWatch: 0
    };
  },
  watch: {
    teacherTopics() {
      // console.log('teacherTopics watch entered')
     if (this.teacherTopics.length !== 0) {
        this.userToUpdate.isTeacher = true;
        this.$store.dispatch({ type: "saveUser", user: this.userToUpdate })
          .then(() => {})
          this.isTeacherWatch++;
      }
    },
  },
  methods: {
    saveUser() {
      this.$store
        .dispatch({ type: "saveUser", user: this.userToUpdate })
        .then(savedUser => {
          this.$swal({
            type: "success",
            title: "Updated!"
          });
        })
        .catch(err => {
          this.$swal({
            type: "error",
            title: "Update Failed"
          });
          console.log("failed:" + err);
        });
    },
   
    addImg(url) {
      this.userToUpdate.img = url;
    }
  },
  created() {
    if (this.$route.name === "editClasses") this.editSection = "EditClasses";
  },
  computed: {
    userToUpdate() {
      let loggedUser = this.$store.getters.loggedUser;
      console.log("user:", loggedUser);
      return JSON.parse(JSON.stringify(loggedUser));
    },
    teacherTopics() {
      return this.$store.getters.teacherTopicsForDisplay;
    },
    isTeacherClasses() {
      // console.log('entered isTeacherClasses computation');
      if (this.isTeacherWatch === -1) return;
      if (this.userToUpdate.isTeacher) return "Classes";
      else return "Become A teacher";
    }
  },
  components: {
    UserService,
    InfoEdit,
    AccountEdit,
    EditClasses,
    Upload
  }
};
</script>


<style scoped>
.menu {
  width: 100%;
}

.content {
  width: 70%;
}
.container {
  padding: 20px;
}

a {
  margin: 10px;
  cursor: pointer;
}

.collection a.collection-item {
  color: #ababab;
}

.collection a.collection-item.active {
  background-color: #2b303b;
  font-family: "MontBold", sans-serif;
}
.edit-container {
  flex-direction: column;
  align-items: center;
}

.menu .collection {
  display: flex;
  overflow: initial;
  /* justify-content: center;   */
}

.collection .collection-item {
  border: 1px solid #e0e0e0;
}

.collection {
  border: 1px solid transparent;
}

@media (min-width: 750px) {
  .edit-container {
    flex-direction: row;
    align-items: start;
  }

  .collection {
    border: 1px solid #e0e0e0;
  }

  .menu .collection {
    display: block;
    overflow: hidden;
  }
  .menu {
    width: 20%;
    margin-right: 20px;
  }
}
</style>


