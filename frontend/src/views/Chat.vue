<template>
  <section class="chat">
            <!-- <div>
                <label> <input type="radio" value="food" v-model="topic" />Food</label>
                <label><input type="radio" value="dogs" v-model="topic" />Dogs</label>
            </div> -->
            <h5>Chatting is Everything</h5>
            recipient: {{msg.recipientId}} <br>
            {{msg}}
            <ul class="msgs">
                <li v-for="msg in msgs" :key="msg.id">
                    {{msg.txt}}
                </li>
            </ul>
            <form @submit.prevent="send">
                <input @input="whenInput" v-model="msg.txt" autocomplete="off" />
                <button>Send</button>
            </form>
            <div style="background-color:yellow">
                {{status.txt}}
            </div>
        </section>
</template>

<script>
import MsgService from '../services/MsgService.js'

export default {
name: 'Chat',
data() {
        return {
            msg: {
                txt: '',
                senderId: '',
                recipientId: this.$route.params.recipientId
            },
            msgs: MsgService.msgs,
            status: MsgService.status,
            // topic: 'food'
        }
    },
    created() {
        this.$socket.emit('chatRequest', this.msg)
        console.log('loggedUserId:', this.$store.getters.loggedUser._id);
        
        this.msg.senderId = this.$store.getters.loggedUser._id
        // MsgService.init();
        // EventBusService.$emit(SHOW_MSG, { txt: 'Chat Loaded!' });
    },
    destroyed() {
        MsgService.destroy();
    },
    methods: {
        send() {
            console.log('msg:', this.msg);
            
            // this.$socket.emit('chatRequest', this.msg)
            // MsgService.sendMsg(this.msg.txt);
            this.$socket.emit('chat newMessage', this.msg);
            this.msg.txt = '';
        }, 
        whenInput() {
            // MsgService.sendStatus('Someone is typing...')
        }
    },
    sockets: {
        ['chat message'](data) {
            console.log('received a chat message:', data, 'msgs:', this.msgs)
            this.msgs.push(data)
        }
    },
    computed: {
        // recipient() {
        //     return this.$route.params.recipientId
        // }
    },
    // watch: {
    //     topic(newVal) {
    //         MsgService.setTopic(newVal);
    //     },
    //     'status.txt'() {
    //         setTimeout(()=>{
    //             this.status.txt = '';
    //         }, 1000)
    //     }
    // }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font: 13px Helvetica, Arial;  }
form { background: rgb(173, 82, 82); padding: 3px; position: fixed; bottom: 0; width: 100%; }
form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
.msgs { list-style-type: none; margin: 0; padding: 0; }
.msgs li { padding: 5px 10px; }
.msgs li:nth-child(odd) { background: #eee; }
.chat {margin-top: 50px}
</style>
 