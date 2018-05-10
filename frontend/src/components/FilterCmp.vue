<template>
    <section class="filter-cmp">
        <section class="container">
            <form class="flex space-between align-center search-bar" @submit.prevent="emitFilter">
                <input v-model="filterBy.text" @focus="isSearching = true" @blur="isSearching = false" type="text" name="search" placeholder="What would you like to learn?">
            </form>
            <section v-if="$mq ==='lg'" class="flex space-between align-center">
                <div class="left-filter flex justify-start align-center">
                    <div class="margin-right40 sort-input">
                        <select onchange="emitFilter()" v-model="filterBy.sort" ref="selectSort">
                            <option value="" disabled selected>Sort by</option>                            
                            <option value="review">Reviews</option>
                            <option value="lowPrice">Price - Low to High</option>
                            <option value="highPrice">Price - High to Low</option>
                        </select>
                    </div>
                    <div class="margin-right40 topic-input ">
                        <select v-model="filterBy.topics" ref="selectTopics" multiple>
                            <option value="" disabled selected>Choose your topics</option>
                            <option v-for="topic in topics" :key="topic._id" :value="topic.subtitle">{{topic.subtitle}}</option>
                        </select>
                    </div>
                    <span v-if="showExtraSearch">Price</span>
                    <div >
                        <vueSlider v-model="filterBy.price" :max="500" :tooltipStyle="priceTooltipStyle" :processStyle="processStyle"
                             @mouseup.native.prevent="emitFilter" :width="300" :show="showExtraSearch"></vueSlider>
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
        this.filterBy = JSON.parse(JSON.stringify(this.$store.getters.teacherTopicFilter));
        if (this.showExtraSearch) {
            this.$store.dispatch({type: 'loadTopics'}).then(topics => {
                $('select').material_select()
            })
        }
    },
    mounted() {
        if (this.$mq === 'lg' && this.showExtraSearch) {
            this.$refs.selectTopics.onchange = this.emitFilter;
            this.$refs.selectSort.onchange = this.emitFilter;

        }
    },
    data() {
        return {
            filterBy: TeacherTopicService.emptyTeacherTopicFilter(),
            isSearching: false,
            priceTooltipStyle: {"backgroundColor": "#0e0f10","borderColor": "#0e0f10"},
            processStyle: {"backgroundColor": "#f9e759"}
        }
    },
    computed:{
        topics(){
            return this.$store.getters.topicsForDisplay;
        }
    },
    methods: {
    emitFilter(){
        this.filterBy.topics = $('.topic-input select').val()
        this.filterBy.sort =$('.sort-input select').val()
        this.$emit('filtered',this.filterBy);
        }
    },
    // watch:{
    //     isSearching: function(newVal) {
    //         if (this.showExtraSearch){
    //             if (newVal) $('select').material_select('destroy')
    //                 else $('select').material_select();
    //         }
    //     }
    // },
    components: {
        vueSlider,
        TeacherTopicService
    }
}
</script>

<style scoped>
    input[type=text] {
        width: 100%;
        box-sizing: border-box;
        border: 2px solid #5f3517;
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
    ::placeholder {
        color: #949494
    }

    input[type=text]:focus {
        width: 100%;
    }

    .filter-cmp {
        padding-top: 10px;
        width: 60%;
        max-width: 500px;
        /* position: fixed; */
        /* top: 100px; */
        /* background-color: white; */
        z-index: 2;
    }
    .left-filter{
        width: 100%;
    }
    .search-bar {
        height: 80px;
    }

    /* @media (min-width: 750px){
        input[type=text] {
            width: 30%;
        }
    } */

</style>
