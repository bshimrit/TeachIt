const REVIEW_URL = '/review';
const ReviewService = require('../services/ReviewService')

module.exports = (app) => {
    app.get(REVIEW_URL, (req, res)=>{

        console.log(req.query);

        ReviewService.query(req.query).then(reviews => {
            console.log('ROUTE REVIEWS: ', reviews);
            res.json(reviews);
        })
    })

    app.post(REVIEW_URL, (req, res)=>{
        const review = req.body;
        ReviewService.add(review).then(addedReview => {
            res.json(addedReview);
        })
    })

    app.delete(`${REVIEW_URL}/:reviewId`, (req, res) => {
        const reviewId = req.params.reviewId;
        
        if (!reviewId) {
            res.status(500).send('Missing reviewId to delete')
        }
        ReviewService
        .remove(reviewId)
        .then(_ => res.end())
        .catch(err => res.status(500).send('Could not delete review'))
    })
    
    app.get(`${REVIEW_URL}/:teacherTopicId`, (req, res) => {
        const teacherTopicId = req.params.teacherTopicId;
        ReviewService.getByTeacherTopicId(teacherTopicId)
            .then(reviews => {
                res.json(reviews)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.get(`${REVIEW_URL}/teacher/:teacherId`, (req, res) => {
        const teacherId = req.params.teacherId;
        ReviewService.getByTeacherId(teacherId)
            .then(reviews => {
                res.json(reviews)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.put(REVIEW_URL, (req, res) => {
        const review = req.body;
        ReviewService
            .update(review)
            .then(review => res.json(review))
            .catch(err => res.status(500).send('Could not update review'))
    })

}