<template>
  <section class="footer">
      <div class="chat-screen">
          <ChatCmp v-if="selectedChat.userId" :userId="selectedChat.userId" @removeChat="removeChat"></ChatCmp>
      </div>
      <ul class="flex">
          <li v-for="(chat, id) in chats" :key="id" @click="getUserId(id)">
              <!-- <router-link :to="`/chat/${id}`"> -->
              <span class="badge">{{chat.new}}</span> {{chat.userName}}
              <!-- </router-link> -->
          </li>
      </ul>
  </section>
</template>

<script>
import ChatCmp from '../../components/chat/ChatCmp.vue'

export default {
name: 'AlertBar',
data() {
    return {
        selectedChat: {
            userId: '',
        }
    }
},
computed: {
    chats() {
        return this.$store.getters.alerts
    }
},
methods: {
    getUserId(userId) {
        this.selectedChat.userId = null
        this.selectedChat.userId = userId
        console.log('msg with:', this.selectedChat.userId);
        
        this.$store.commit({type: 'removeNewMsgs', recipient: userId})

        this.$store.commit({type: 'chatWith', userId})
    },
    removeChat() {
        this.selectedChat.userId = null
    }
},
components: {
    ChatCmp
}
}
</script>

<style scoped>
ul {
    flex-flow: row-reverse;
    padding: 0 10px;
}
li {
    background-color: #2b303b;
    border: 1px solid #ffe75a;
    padding: 5px;
    font-size: 0.9rem;
    /* margin: 10px */
}
a {
    color: #ffe75a
}
.badge {
    background-color: #ffe75a;
    color: #2b303b;
    flex-flow: row-reverse;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    min-width: 0;
    font-size: 0.8em;
    margin: 5px
}
.chat-screen {
    position: absolute;
    height: 500px;
    width: 400p;
    /* padding: 10px; */
    background-color: #ffffff;
    border: 1px solid #2b303b
}
</style>
