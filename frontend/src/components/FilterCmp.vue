<template>
  <section>
    <div class="box">
            <div class="container-1">
                <span class="icon"><i class="fa fa-search"></i></span>
                <input v-model="filterBy.text" type="search" id="search" placeholder="Search..." />
            </div>
        </div>
        <label> Price
            <input type="range" min="0" max="1000" />
        </label>
        <div>
            <label> Topic
                <select v-model="filterBy.topic">
                    <option v-for="topic in topics" :key="topic._id" :value="topic.title">{{topic.subtitle}}</option>
                </select>
            </label>
        </div>
  </section>
</template>

<script>
export default {
    name:'search',
    created(){
         this.$store.dispatch({type: 'loadTopics'})
    },
    data() {
        return {
            filterBy: {text:'', price:0, topic:null}
        }
    },
    computed:{
        topics(){
            return this.$store.getters.topicsForDisplay;
        }
    },
    methods: {
    emitFilter(){
        this.$emit('filtered',this.filterBy);
        }
    }
}
</script>

<style scoped>
select {
    display:inline;
}
.box{
  margin: 100px auto;
  width: 300px;
  height: 50px;
}
.container-1{
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}
.container-1 input#search{
  width: 300px;
  height: 50px;
  background: #2b303b;
  border: none;
  font-size: 10pt;
  float: left;
  color: #63717f;
  padding-left: 45px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.container-1 input#search::-webkit-input-placeholder {
   color: #65737e;
}
 
.container-1 input#search:-moz-placeholder { /* Firefox 18- */
   color: #65737e;  
}
 
.container-1 input#search::-moz-placeholder {  /* Firefox 19+ */
   color: #65737e;  
}
 
.container-1 input#search:-ms-input-placeholder {  
   color: #65737e;  
}
.container-1 .icon{
  position: absolute;
  top: 50%;
  margin-left: 17px;
  margin-top: 17px;
  z-index: 1;
  color: #4f5b66;
}
.container-1 input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
    outline:none;
    background: #ffffff;
  }
</style>
