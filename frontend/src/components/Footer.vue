<template>
  <section class="footer">
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
        return this.$store.getters.alerts
    }
}
}
</script>

<style>

</style>
