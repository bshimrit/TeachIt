
const TOPIC_URL = '/topic'

function emptyTopic() {
    return {title:'',subtitle:''}
}

function getTopics(filter) {
    var criteria = {}
    return axios
            .get(TOPIC_URL)
            .then(res => res.data)
            .catch(e => console.log('No Topics', e))
}

function saveTopic(topic) {
    if (topic._id) return axios.put(TOPIC_URL, topic)
    else return axios.post(TOPIC_URL, topic);  
}

function deleteTopic(topicId) {
    return axios.delete(_getTopicUrl(topicId))
}

function getTopicById(topicId) {
    return axios
    .get(_getTopicUrl(topicId))
    .then(res => res.data)
}

function _getTopicUrl(topicId) {
    return `${TOPIC_URL}/${topicId}`;
}

export default {
    getTopics,
    saveTopic,
    deleteTopic,
    emptyTopic,
    getTopicById
}