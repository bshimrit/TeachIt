<template>
  <section v-if="false" class="footer">
      <ul>
          <li v-for="(chat, id) in chats" :key="chat">
              <router-link :to="`/chat/${id}`">
              {{chat.new}} new messages from {{chat.userName}}
              </router-link>
          </li>
      </ul>
  </section>
</template>

<script>
export default {
name: 'foot',

computed: {
    chats() {
        console.log('in footer:', this.$store.getters.alerts);
        
        return this.$store.getters.alerts
    }
}
}
</script>

<style>

</style>
