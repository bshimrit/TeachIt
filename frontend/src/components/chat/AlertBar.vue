<template>
  <section class="footer">
      <div class="chat-screen">
          <ChatCmp v-show="selectedChat.userId || newChat" :userId="selectedChat.userId" @removeChat="removeChat"></ChatCmp>
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
        var chats = {new: null, userName: null}
        chats = this.$store.getters.alerts
        return chats
    }, 
    newChat() {
        console.log('setting userId:', this.$store.getters.startNewChat.recipientId);
        
        this.selectedChat.userId = this.$store.getters.startNewChat.recipientId
        return this.$store.getters.startNewChat.isNewChat
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
    background-color: #0e0f10;
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
    color: #0e0f10;
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
    height: 450px;
    /* width: 450px; */
    /* padding: 10px; */
    background-color: #ffffff00;
    border: 1px solid #0e0f10
}
</style>
