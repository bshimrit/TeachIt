<template>
<div class=" navbar-fixed" v-show="scrolled">
  <nav>
    <div class="container nav-wrapper">
      <a href="/" class="brand-logo left"><img src="../assets/logo.png" class="logo-img"></a>
      <ul id="nav-mobile" class="right hide-on-small-and-down lower">
        <li><router-link to="/">Home</router-link></li> 
        <li><router-link to="/about">About</router-link></li> 
        <li><router-link to="/search">Search</router-link></li> 
        <li v-if="!loggedUser"><router-link to="/login">Log in</router-link></li>
        <template v-else>
        <li></li>
        <li><router-link :to="`/profile/${loggedUser._id}`"></router-link></li>
        <li><a href="#">Become a teacher</a></li>
        <li @click.stop><a class="profile-img" @click="toggleDropdown"><img class="profile" :src="loggedUser.img"></a></li>
        <ul class="dropdown" v-if="dropdown" @click.stop>
            <li><router-link :to="`/profile/teacher/${loggedUser._id}`">My profile</router-link></li>
            <li v-if="loggedUser.isTeacher"><router-link :to="`/profile/topic/${loggedUser._id}`">My classes</router-link></li>
            <li><a @click="logOut">Log out</a></li>
        </ul>
        </template>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            scrolled: true,
            YOffset: 0
        }
    },
  methods: {
    logOut() {
      console.log('logging out');
      this.$store.commit({ type: 'logOut' });
      this.$router.push('/');
    },
    toggleDropdown() {
      this.$store.commit({ type: 'toggleDropdown' });
    },
//     handleScroll () {
//         this.scrolled = (window.scrollY <= this.YOffset) 
//         console.log('window.scrollY:', window.scrollY, 'this.scrollY:', this.YOffset);
//         this.YOffset = window.scrollY;
//   }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    dropdown() {
      return this.$store.getters.dropdown;
    }
  },
//   created() {
//     window.addEventListener('scroll', this.handleScroll);
//   },
//   destroyed() {
//     window.removeEventListener('scroll', this.handleScroll);
//   }
};
</script>

<style scoped>
nav {
  width: 100vw;
  height: 100px;
  padding: 10px 0;
  background-color: #2b303b;
  text-align: left;
}
.logo-img {
  width: 150px;
  margin: 10px auto;
}
#nav-mobile {
  margin: auto 0;
}
.lower {
  padding-top: 12px;
}
.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 100%;
  padding: 20px;
  background-color: #2b303b;
  z-index: 10;
}
.navbar-fixed {
  margin-bottom: 10px;
}
.hide-nav {
    top: -100%
}
.profile-img {
  padding-right: 0;
}
</style>
