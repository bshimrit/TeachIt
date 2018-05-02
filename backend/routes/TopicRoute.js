const TOPIC_URL = '/topic';
const TopicService = require('../services/TopicService')

module.exports = (app) => {
    app.get(TOPIC_URL, (req, res)=>{

        console.log(req.query);

        TopicService.query(req.query).then(topics => {
            console.log('ROUTE TOPICS: ', topics);
            res.json(topics);
        })
    })

    app.post(TOPIC_URL, (req, res)=>{
        const topic = req.body;
        TopicService.add(topic).then(addedTopic => {
            res.json(addedTopic);
        })
    })

    app.delete(`${TOPIC_URL}/:topicId`, (req, res) => {
        const topicId = req.params.topicId;
        if (!topicId) {
            res.status(500).send('Missing topicId to delete')
        }
        TopicService
            .remove(topicId)
            .then(_ => res.end())
            .catch(err => res.status(500).send('Could not delete topic'))
    })

    app.get(`${TOPIC_URL}/:topicId`, (req, res) => {
        const topicId = req.params.topicId;
        TopicService.getById(topicId)
            .then(topic => {
                res.json(topic)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.put(TOPIC_URL, (req, res) => {
        const topic = req.body;
        TopicService
            .update(topic)
            .then(topic => res.json(topic))
            .catch(err => res.status(500).send('Could not update topic'))
    })

}