let TOPIC_TEACHER_URL = "/teacherTopic";

if (process.env.NODE_ENV !== 'development') {
  TOPIC_TEACHER_URL = '/teacherTopic'
}


function emptyTeacherTopicFilter() {
    return {text:'',price:[0,500], topics:[], sort:''}
}

function emptyTeacherTopic() {
  return {
    topicId: null,
    teacherId: null,
    level: "",
    pricePerHour: 0,
    rating: null,
    shortDes: "",
    longDes:"",
    topicImage: ""
  };
}

function convertFilterToURL(filter){
  var criteria = "?";
  if (filter) {
    if (filter.text) criteria += `text=${filter.text}&`;
    if (filter.price && filter.price.length) {
      criteria += `minprice=${filter.price[0]}&maxprice=${filter.price[1]}&`;
    }
    if (filter.topics) {
      for (var i = 0; i < filter.topics.length; i++) {
        criteria += `&topics=${filter.topics[i]}`;
      }
    }
    if (filter.sort){
        criteria += `&sort=${filter.sort}`
    }
  }
  return criteria;
}

function getTeacherTopics(filter) {
  return axios
    .get(TOPIC_TEACHER_URL + this.convertFilterToURL(filter))
    .then(res => res.data)
    .catch(e => console.log("No Topic for Teacher", e));
}

function saveTeacherTopic(teacherTopic) {
if (!teacherTopic.topicImage) {
  teacherTopic.topicImage  ='./img/topics/topic1.jpg'
}
  if (teacherTopic._id) return axios.put(TOPIC_TEACHER_URL, teacherTopic).then(res => res.data[0]);
  else return axios.post(TOPIC_TEACHER_URL, teacherTopic).then(res => res.data[0]);
}

function deleteTeacherTopic(teacherTopicId) {
  return axios.delete(_getTeacherTopicUrl(teacherTopicId));
}

function getTeacherTopicById(teacherTopicId) {
  return axios.get(_getTeacherTopicUrl(teacherTopicId)).then(res => res.data);
}

function getTopicsByTeacherId(teacherId) {
  return axios
    .get(_getTeacherTopicUrl(teacherId, "teacher"))
    .then(res => res.data);
}

function getPopularTopics() {
  return axios.get("/popularTopics").then(res => res.data);
}

function _getTeacherTopicUrl(id, type) {
  if (type) return `${TOPIC_TEACHER_URL}/${type}/${id}`;
  else return `${TOPIC_TEACHER_URL}/${id}`;
}

export default {
  getTeacherTopics,
  saveTeacherTopic,
  deleteTeacherTopic,
  emptyTeacherTopicFilter,
  getTeacherTopicById,
  getTopicsByTeacherId,
  getPopularTopics,
  convertFilterToURL,
  emptyTeacherTopic
};
