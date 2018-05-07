import reviewService from '../services/ReviewService.js'

export default {
  strict: true,
  state: {
    reviews: [],
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
  },
  actions: {
    loadReviewsByTeacherTopicId(store, {teacherTopicId}) {
      return reviewService.getReviewsByTeacherTopicId(teacherTopicId)
      .then(reviews => {
          store.commit({ type: 'setReviews', reviews });
      })
    }
  }
}
