<template>
  <div class="topic-review">

 

 <div class="row">
    <div class="col s12 m5">
      <div class="card-panel">
            <form class="flex flex-column justify-start" @submit.prevent="addReview">
            <h5>Add Review</h5>
            <label>
                Name
                <input type="text" v-model="review.fullName"/>
            </label>
            <label>
                Rate Class
                <input type="number" v-model.number="review.rate"  />
            </label>
           
            <label>
                Review
                <input type="text" v-model="review.text" />
            </label>
            <button class="btn" type="submit" :disabled="!isValid">Add review</button>
        </form>
      </div>
    </div>
  </div>

   

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
                fullName: 'loggedIn username',
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

