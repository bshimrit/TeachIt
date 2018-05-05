
const TOPIC_TEACHER_URL = '/teacherTopic'

function emptyTeacherTopic() {
    return {title:'',subtitle:''}
}

function getTeacherTopics(filter) {
    var criteria = "";
    return axios
            .get(TOPIC_TEACHER_URL)
            .then(res => res.data)
            .catch(e => console.log('No Topic for Teacher', e))
}


function saveTeacherTopic(teacherTopic) {
    if (teacherTopic._id) return axios.put(TOPIC_TEACHER_URL, teacherTopic)
    else return axios.post(TOPIC_TEACHER_URL, teacherTopic);  
}

function deleteTeacherTopic(teacherTopicId) {
    return axios.delete(_getTeacherTopicUrl(teacherTopicId))
}

function getTeacherTopicById(teacherTopicId) {
    return axios
    .get(_getTeacherTopicUrl(teacherTopicId,'topic'))
    .then(res => res.data)
}

function getTopicsByTeacherId(teacherId) {
    return axios
    .get(_getTeacherTopicUrl(teacherId,'teacherTopics'))
    .then(res => res.data)
}

function getTeachersByTopicId(topicId) {
    return axios
    .get(_getTeacherTopicUrl(topicId,'teacherTopics'))
    .then(res => res.data)
}

function _getTeacherTopicUrl(id,type) {
    return `${TOPIC_TEACHER_URL}/${type}/${id}`;
}

export default {
    getTeacherTopics,
    saveTeacherTopic,
    deleteTeacherTopic,
    emptyTeacherTopic,
    getTeacherTopicById
}