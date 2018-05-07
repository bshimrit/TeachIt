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
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
        </GmapMap>
      </div>
  </section>
</template>

<script>
export default {
  name: "TeacherMap",
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
    /* width: 300px; */
    margin: 10px 10px 10px 20px;
    position: fixed;
    right: 15px;
    height: 52%; 
}
</style>
