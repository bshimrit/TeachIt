<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
<<<<<<< HEAD
=======
      <router-link to="/search">Search</router-link> 
>>>>>>> 84a64ee1a2e1a1ed3dbe52644e949a532b709a27
      <router-link to="/profile">Profile</router-link> |

    </div>
    <router-view/>
  </div>
</template>

<script>
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
