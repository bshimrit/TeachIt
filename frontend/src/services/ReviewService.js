
const REVIEW_URL = '/review'

function emptyReview() {
    return {
        fullName: '',
        rate: 0,
        text: ''
    };
}

function getReviews(filter) {
    var criteria = {}
    return axios
            .get(REVIEW_URL)
            .then(res => res.data)
            .catch(e => console.log('No Reviews', e))
}

function saveReview(review) {
    if (review._id) return axios.put(REVIEW_URL, review)
    else return axios.post(REVIEW_URL, review);  
}

function deleteReview(reviewId) {
    return axios.delete(_getReviewUrl(reviewId))
}

function getReviewById(reviewId) {
    return axios
    .get(_getReviewUrl(reviewId))
    .then(res => res.data)
}

function _getReviewUrl(reviewId) {
    return `${REVIEW_URL}/${reviewId}`;
}

export default {
    getReviews,
    saveReview,
    deleteReview,
    emptyReview,
    getReviewById
}