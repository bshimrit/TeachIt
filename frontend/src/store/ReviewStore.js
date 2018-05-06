import reviewService from '../services/ReviewService.js'

export default {
  strict: true,
  state: {
    reviews: [],
    popularTeacherReviews:[],
    reviewFilter: '',
  },
  mutations: {
    setReviewFilter(state, { filter }) {
      state.reviewFilter = filter;
    },
    deleteReview(state, { reviewId }) {
      state.reviews = state.reviews.filter(review => review.id !== reviewId)
    },
    setSelectedReview(state, { review }) {
      state.selectedReview = review;
    },
    addReview(state, { review }) {
      state.reviews = [review, ...state.reviews];
    },
    updateReview(state, { review }) {
      const reviewIdx = state.reviews.findIndex(currReview => currReview.id === review.id)
      state.reviews.splice(reviewIdx, 1, review)
    },
    setReviews(state, {reviews}) {
      state.reviews = reviews;
    }
  },
  getters: {
    reviewsForDisplay(state) {
      return state.reviews;
    },
    popularReviewsForDisplay(state) {
      return state.popularTeacherReviews;
    },

  },
  actions: {
    loadReviews(store, {teacherTopicId}) {
      return reviewService.getReviewsById(teacherTopicId)
      .then(reviews => {
          store.commit({ type: 'setReviews', reviews });
      })
    },
    
    // loadReview(store, {reviewId}) {
    //   return reviewService.getById(reviewId)
    //   .then(review => {
    //     store.commit({type: 'setSelectedReview', review});
    //     return review;
    //   })
    // },
    // deleteReview(store, {reviewId}) {
    //   return reviewService.deleteReview(reviewId)
    //   .then(()=>{
    //     store.commit({type: 'deleteReview', reviewId});
    //   })
    // },
    // saveReview(store, {review}) {
    //   const isEdit = !!review.id;
    //   return reviewService.saveReview(review)
    //   .then(review => {
    //     if (isEdit) store.commit({type: 'updateReview', review})
    //     else store.commit({type: 'addReview', review})
    //     return review;
    //   })
    // },
    // getReviewById(store, {reviewId}) {
    //       return reviewService.getReviewById(reviewId)
    //         .then(review => {
    //           return review;
    //     })   
    // },
  }
}
