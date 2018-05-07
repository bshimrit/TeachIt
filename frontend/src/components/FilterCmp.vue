<template>
    <section class="filter-cmp">
        <section class="container">
            <form class="flex space-between align-center" @submit.prevent="emitFilter">
                <input v-model="filterBy.text" @focus="isSearching = true" @blur="isSearching = false" type="text" name="search" placeholder="Search teacher\topic\location..">
            </form>
            <section class="flex space-between align-center">
                <div class="left-filter flex justify-start align-center">
                    <span v-if="!isSearching && showExtraSearch">Price</span>
                    <div class="margin-right20">
                        <vueSlider v-model="filterBy.price" :max="600" @mouseup.native.prevent="emitFilter" :width="300" :show="!isSearching && showExtraSearch"></vueSlider>
                    </div>
                    <div class="input-field ">
                        <select v-model="filterBy.topics" ref="selectTopics" multiple>
                            <option value="" disabled selected>Choose your topics</option>
                            <option v-for="topic in topics" :key="topic._id" :value="topic.subtitle">{{topic.subtitle}}</option>
                        </select>
                    </div>
                </div>
                <div class="right-filter">
                    <div class="input-field">
                        <select v-model="filterBy.sort" ref="selectSort">
                            <option value="" disabled selected>Sort by</option>                            
                            <option value="review">Reviews</option>
                            <option value="lowPrice">Price - Low to High</option>
                            <option value="highPrice">Price - High to Low</option>
                        </select>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>

<script>
import vueSlider from 'vue-slider-component';
import TeacherTopicService from '@/services/TeacherTopicService.js'

export default {
    name:'search',
    props:{showExtraSearch:{default: false}},
    created(){
        console.log(this.filterBy)
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
            filterBy: TeacherTopicService.emptyTeacherTopicFilter(),
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
        vueSlider,
        TeacherTopicService
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
    .left-filter{
        width: 60%;
    }


</style>
