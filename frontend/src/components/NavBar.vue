<template>
<div class="navbar">
  <nav>
    <div class="nav-wrapper">
      <a href=# class="brand-logo left"><img src="../assets/logo.png" class="logo-img"></a>
      <ul id="nav-mobile" class="right hide-on-small-and-down lower">
        <li><router-link to="/">Home</router-link></li> 
        <li><router-link to="/about">About</router-link></li> 
        <li><router-link to="/search">Search</router-link></li> 
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/login">Log in</router-link></li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
export default {
    components: {
    }
}
</script>

<style scoped>
    nav {
        width: 100vw;
        height: 100px;
        padding: 10px 0;
        margin-bottom: 20px;
        background-color: #2b303b;
        text-align: left;
    }
    .nav-wrapper {
        padding: 0 30px;
    }
    .logo-img {
        width: 150px;
        margin: 10px auto;
    }
    #nav-mobile {
        margin: auto 0
    }
    .lower {
        padding-top: 12px
    }
</style>
