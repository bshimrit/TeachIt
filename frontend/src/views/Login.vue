<template>
  <section class="loginPage">
      <div class="container">
      <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="first_name" type="text" class="validate">
                    <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s6">
                    <input id="last_name" type="text" class="validate">
                    <label for="last_name">Last Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input id="password" type="password" class="validate">
                <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input id="email" type="email" class="validate">
                <label for="email">Email</label>
                </div>
            </div>
        </form>
    </div>
      </div>
  </section>
</template>

<script>
export default {
  created() {
    console.log("Logging in!");
  }
};
</script>

<style>
.container {
  width: 50%;
  border: 2px solid black;
  padding: 10px
}
</style>
