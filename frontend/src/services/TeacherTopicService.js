
const TOPIC_TEACHER_URL = '/teacherTopic'

function emptyTeacherTopic() {
    return {text:'',price:[0,500], topics:[]}
}

function getTeacherTopics(filter) {
    var criteria = '?';
    if (filter){
        if (filter.text) criteria += `text=${filter.text}&`;
        if (filter.price.length){
            criteria += `minprice=${filter.price[0]}&maxprice=${filter.price[1]}&`
        }
        if (filter.topics){
            for(var i = 0; i < filter.topics.length; i++){
                criteria += `${i > 0 ? '&' : ''}topics=${filter.topics[i]}`
            }
        }
    }
    return axios
            .get(TOPIC_TEACHER_URL + criteria)
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
    .get(_getTeacherTopicUrl(teacherTopicId))
    .then(res => res.data)
}


function getTopicsByTeacherId(teacherId) {
    return axios
    .get(_getTeacherTopicUrl(teacherId,'teacher'))
    .then(res => res.data)
}

function getPopularTopics() {
    return axios
        .get('/popularTopics')
        .then(res => res.data)
}


function _getTeacherTopicUrl(id,type) {
    if (type) return `${TOPIC_TEACHER_URL}/${type}/${id}`;
    else return `${TOPIC_TEACHER_URL}/${id}`;
}

export default {
    getTeacherTopics,
    saveTeacherTopic,
    deleteTeacherTopic,
    emptyTeacherTopic,
    getTeacherTopicById,
    getTopicsByTeacherId,
    getPopularTopics
}