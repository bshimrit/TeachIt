<template>
    <section class="filter-cmp">
        <section class="container">
            <form class="flex space-between align-center" @submit.prevent="emitFilter">
                <input v-model="filterBy.text" @focus="isSearching = true" @blur="isSearching = false" type="text" name="search" placeholder="Search teacher\topic\location..">
                <div class="flex align-center">
                    <div v-if="!isSearching && showExtraSearch">Price</div>
                    <vueSlider v-model="filterBy.price" :max="500" @mouseup.native.prevent="emitFilter" :width="300" :show="!isSearching && showExtraSearch"></vueSlider>
                </div>
                <div class="input-field ">
                    <select v-model="filterBy.topics" ref="selectTopics" multiple>
                    <option value="" disabled selected>Choose your topics</option>
                    <option v-for="topic in topics" :key="topic._id" :value="topic.subtitle">{{topic.subtitle}}</option>
                    </select>
                </div>
            </form>
        </section>
    </section>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
    name:'search',
    props:{showExtraSearch:{default: false}},
    created(){
        this.filterBy = JSON.parse(JSON.stringify(this.$store.getters.teacherTopicFilter));
        if (this.showExtraSearch) {
            this.$store.dispatch({type: 'loadTopics'}).then(topics => {
                $('select').material_select()
                this.$refs.selectTopics.onchange = this.emitFilter;
            })
        }
    },
    mounted() {
        },
    data() {
        return {
            filterBy: {text:'', price:[], topics:[]},
            isSearching: false,
        }
    },
    computed:{
        topics(){
            return this.$store.getters.topicsForDisplay;
        }
    },
    methods: {
    emitFilter(){
        this.filterBy.topics = $('select').val()
        this.$emit('filtered',this.filterBy);
        }
    },
    watch:{
        isSearching: function(newVal) {
            if (this.showExtraSearch){
                if (newVal) $('select').material_select('destroy')
                    else $('select').material_select();
            }
        }
    },
    components: {
        vueSlider
    }
}
</script>

<style scoped>
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

    .filter-cmp {
        padding-top: 10px;
        width: 100%;
        position: fixed;
        top: 100px;
        background-color: white;
        z-index: 2;
}


</style>
