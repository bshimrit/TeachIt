<template>
  <section v-if="false" class="footer">
      <ul>
          <p v-if="show">Don't worry shimrit, this is only temporary!</p>
          <li v-for="(chat, id) in chats" :key="id">
              {{chat.new}} new messages from {{chat.userName}}
          </li>
      </ul>
  </section>
</template>

<script>
export default {
name: 'foot',
data() {
    return {
        show: true
    }
},
computed: {
    chats() {
        return this.$store.getters.alerts
    }
}
}
</script>

<style>

</style>
