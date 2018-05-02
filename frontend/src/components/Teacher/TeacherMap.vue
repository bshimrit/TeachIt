<template>
  <section>
      <!-- <div class="map"></div> -->
      <GmapMap
        :center="{lat:32.08, lng:34.8}"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100%; height: 300px; border: 1px solid"
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
  </section>
</template>

<script>
export default {
  name: "TeacherMap",
  data() {
      return {
          markers: [{position: {lat:32.08, lng:34.8}},{position: {lat:32.075, lng:34.781}},{position: {lat:32.079, lng:34.78}}]
      }
  }
};

</script>

<style>
.map {
  display: inline-block;
  width: 100%;
  height: 300px;
  background-color: greenyellow;
}
</style>
