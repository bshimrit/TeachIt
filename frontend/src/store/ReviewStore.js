import reviewService from '../services/ReviewService.js'

export default {
  strict: true,
  state: {
    reviews: [],
    reviewsCnt: []
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
    },
    setReviewsCnt(state, {reviews}) {
      var reviewsCnt = [0,0,0,0,0,0]
      for (var i = 0; i < reviews.length; i++){
        var rateIdx = reviews[i].topicRating;
        reviewsCnt[rateIdx]++;
      }
      state.reviewsCnt = reviewsCnt; 
    }
  },
  getters: {
    reviewsForDisplay(state) {
      return state.reviews;
    },
    reviewsCntDisplay(state) {
      return state.reviewsCnt;
    }
  },
  actions: {
    loadReviewsByTeacherTopicId(store, {teacherTopicId}) {
      return reviewService.getReviewsByTeacherTopicId(teacherTopicId)
      .then(reviews => {
          store.commit({ type: 'setReviews', reviews });
          store.commit({ type: 'setReviewsCnt', reviews });
      })
    },
    loadReviewsByTeacherId(store, {teacherId}) {
      return reviewService.getReviewsByTeacherId(teacherId)
      .then(reviews => {
          store.commit({ type: 'setReviews', reviews });
          store.commit({ type: 'setReviewsCnt', reviews });
      })
    }
  }
}
