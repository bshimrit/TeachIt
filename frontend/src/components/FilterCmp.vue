<template>
  <section class="container filter-cmp flex flex-column align-start">
    <input v-model="filterBy.text" type="text" name="search" placeholder="Search..">
    <div>
        <div class="margin-top20 flex align-center">
            <div>Price</div>
            <vueSlider v-model="filterBy.price" :width="300"></vueSlider>
        </div>
        <div class="margin-top20 flex align-center">
            <div>Topic</div>
            <select v-model="filterBy.topic">
                <option value="" disabled selected>Choose a topic</option>
                <option v-for="topic in topics" :key="topic._id" :value="topic.subtitle">{{topic.subtitle}}</option>
            </select>
        </div>
    </div>
  </section>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
    name:'search',
    created(){
         this.$store.dispatch({type: 'loadTopics'})
    },
    data() {
        return {
            filterBy: {text:'', price:[20,50], topic:null},
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
    },
    components: {
        vueSlider
    }
}
</script>

<style scoped>
/* .filter-cmp {
    width: 100%
} */
input[type=text] {
    width: 30%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-image: url('../../public/img/searchicon.png');
    background-size: 25px;
    background-position: 10px 10px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

input[type=text]:focus {
    width: 100%;
}
</style>
