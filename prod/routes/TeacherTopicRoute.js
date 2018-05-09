const TEACHER_TOPIC_URL = '/teacherTopic';
const TeacherTopicService = require('../services/TeacherTopicService')

module.exports = (app) => {
    app.get(TEACHER_TOPIC_URL, (req, res)=>{
        TeacherTopicService.query(req.query).then(teacherTopics => {
            res.json(teacherTopics);
        })
    })

    app.post(TEACHER_TOPIC_URL, (req, res)=>{
        const teacherTopic = req.body;
        TeacherTopicService.add(teacherTopic).then(addedTeacherTopic => {
            res.json(addedTeacherTopic);
        })
    })

    app.delete(`${TEACHER_TOPIC_URL}/:teacherTopicId`, (req, res) => {
        const teacherTopicId = req.params.teacherTopicId;
        if (!teacherTopicId) {
            res.status(500).send('Missing teacherTopicId to delete')
        }
        TeacherTopicService
            .remove(teacherTopicId)
            .then(_ => res.end())
            .catch(err => res.status(500).send('Could not delete teacherTopic'))
    })

    app.get(`${TEACHER_TOPIC_URL}/:teacherTopicId`, (req, res) => {
        const teacherTopicId = req.params.teacherTopicId;
        TeacherTopicService.getById(teacherTopicId)
            .then(teacherTopic => {
                res.json(teacherTopic)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.get(`${TEACHER_TOPIC_URL}/teacher/:teacherId`, (req, res) => {
        const teacherId = req.params.teacherId;
        TeacherTopicService.getTeacherTopicsById(teacherId)
            .then(teacherTopic => {
                res.json(teacherTopic)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.get(`/popularTopics`, (req, res) => {
        TeacherTopicService.getPopularTopics().then(teacherTopics => {
            // console.log(teacherTopics)
            res.json(teacherTopics);
        })
    })

    app.put(TEACHER_TOPIC_URL, (req, res) => {
        const teacherTopic = req.body;
        TeacherTopicService
            .update(teacherTopic)
            .then(teacherTopic => res.json(teacherTopic))
            .catch(err => res.status(500).send('Could not update teacherTopic'))
    })

}