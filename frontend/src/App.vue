<template>
  <div id="app" @click="closeDropdown">
    <div id="nav">
      <NavBar/>
    </div>
    <div id="router">
        <router-view/>
    </div>
    <alert-bar id="alert-bar" v-if="alertsCount || chatting"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AlertBar from "./components/chat/AlertBar.vue";
export default {
  components: {
    NavBar,
    AlertBar
  },
  created() {
    if (sessionStorage.user) {
      var user = JSON.parse(sessionStorage.user);
      this.$store.dispatch({ type: "loadUser", userId: user._id });
    }
  },
  methods: {
    closeDropdown() {
      this.$store.commit({ type: "closeDropdown" });
    },
  },
  sockets: {
    ["alert user"](data) {
      // console.log('allerting all users!', data);
      if (data.recipientId === this.$store.getters.loggedUser._id) {
        this.$store.commit({ type: "recievedMsg", msg: data });
        // this.$socket.emit('chatRequest', this.msg);
      }
    }
  },
  computed: {
      alertsCount() {
          return this.$store.getters.alertsNum
      },
      chatting() {
          return this.$store.getters.chatWith
      }
  }
};
</script>
<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #577594;
  font-family: "MontRegular", sans-serif;
  font-size: 20px;
  text-transform: initial;
}
#nav {
  // padding: 0 30px;
  a {
    font-weight: bold;
    color: #9fb6ce;
    &.router-link-exact-active {
      color: #ffe75a;
    }
  }
}
#nav {
  margin-bottom: 20px;
  height: 10vh;
}
#router {
  height: 90vh;
}
#alert-bar {
  width: 100%;
  height: 80px;
  background-color: #2b303b;
  color: #ffe75a;
  border: 1px solid #ffe75a;
  position: fixed;
  bottom: 0;
  z-index: 5;
}
</style>
