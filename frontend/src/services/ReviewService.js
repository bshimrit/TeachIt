const REVIEW_URL = "http://localhost:3000/review";

function emptyReview() {
  return {
    userId: "",
    teacherId: "",
    topicId: "",
    reviewTxt: "",
    rating: ""
  };
}

function getReviews() {
    return axios
        .get(REVIEW_URL, teacherTopicId)
        .then(res => res.data)
        .catch(e => console.log("No Reviews", e));
}

function saveReview(review) {
  if (review._id) return axios.put(REVIEW_URL, review);
  else return axios.post(REVIEW_URL, review);
}

function deleteReview(reviewId) {
  return axios.delete(_getReviewUrl(reviewId));
}

function getReviewsByTeacherTopicId(teacherTopicId) {
  return axios.get(_getReviewUrl(teacherTopicId)).then(res => {
    return res.data
});
}
function getReviewsByTeacherId(teacherId) {
  return axios.get(`${REVIEW_URL}/teacher/${teacherId}`).then(res => {
    return res.data
});
}

function _getReviewUrl(reviewId) {
  return `${REVIEW_URL}/${reviewId}`;
}

export default {
  getReviews,
  saveReview,
  deleteReview,
  emptyReview,
  getReviewsByTeacherTopicId,
  getReviewsByTeacherId
};
