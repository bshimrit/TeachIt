<template>
  <div id="app">
    <div id="nav">
      <NavBar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  export default{
    components: {
      NavBar
    }
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #577594;
}
#nav {
    // padding: 0 30px;
  a {
    font-weight: bold;
    color: #577594;
    &.router-link-exact-active {
      color: #ffe75a;
    }
  }

}
#nav {
    margin-bottom: 20px
}
</style>
