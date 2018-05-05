<template>
  <div class="topic-review">
    <form class="flex flex-column justify-start" @submit.prevent="addReview">
            <h3>Add Review</h3>
            <label>
                Name
                <input type="text" v-model="review.fullName"  placeholder="Full name" />
            </label>
            <label>
                Rate Class
                <input type="number" v-model.number="review.rate"  />
            </label>
           
            <label>
                Review
                <input type="text" v-model="review.text" />
            </label>
            <button class="clear-btn1" type="submit" :disabled="!isValid">Add review</button>
        </form>

  </div>
</template>

<script>

export default {
  data() {
        return {
            review: this.getEmptyReview(),
           
        }
    },
    computed: {
        isValid() {
            return this.review.rate > 0;
        }
    },
    methods: {
        getEmptyReview() {
            return {
                fullName: 'miki levi',
                rate: 0,
                readAt: (new Date()),
                text: 'Great Class'
            };
        },
        addReview(){
            bookService.addReview(this.book.id,this.review)
            .then(saveReview => {
                console.log("Review was saved!!")
                this.review = this.getEmptyReview()
            })
            .catch(err => {
                console.error('Review Was NOT Saved', err);
            })
        }
        
    }
}
</script>


<style scoped>
.topic-review {
  width: 70%;
}
</style>

