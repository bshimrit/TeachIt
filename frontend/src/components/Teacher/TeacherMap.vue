<template>
  <section class="map-container">
      <div class="map">
      <GmapMap
        :center="{lat:32.08, lng:34.79}"
        :zoom="13"
        map-type-id="terrain"
        style="width: 100%; height: 100%; border: 1px solid #577594"
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in teacherTopics"
            :position="{lat: m.topicLocation.coordinates[0], lng: m.topicLocation.coordinates[1]}"
            :clickable="true"
            :draggable="true"
            @click="center={lat: m[0].topicLocation.coordinates[0], lng: m[0].topicLocation.coordinates[1]}"
        />
        </GmapMap>
      </div>
  </section>
</template>

<script>
export default {
  name: "TeacherMap",
  props: ['teacherTopics'],
  data() {
      return {
          markers: [{position: {lat:32.08, lng:34.8}},{position: {lat:32.085, lng:34.781}},{position: {lat:32.075, lng:34.78}}]
      }
  }
};

</script>

<style>
.map {
  display: inline-block;
  background-color: greenyellow;
  width: 100%;
  height: 100%;
}
.map-container {
    margin: 10px 10px 10px 20px;
    position: fixed;
    right: 0;
    height: 100%; 
}
</style>
