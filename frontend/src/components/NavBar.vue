<template>
<div class="navbar-fixed">>
  <nav>
    <div class="nav-wrapper">
      <a href=# class="brand-logo"><i class="brand-logo fas fa-lightbulb"></i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li> 
        <li><router-link to="/about">About</router-link></li> 
        <li><router-link to="/search">Search</router-link></li> 
        <li><router-link to="/profile">Profile</router-link></li>
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
    .nav-wrapper {
        background-color: #2b303b
    }
</style>
