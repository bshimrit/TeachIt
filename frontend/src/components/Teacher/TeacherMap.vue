<template>
  <section>
      <div class="map"></div>
      <!-- <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
        >
        <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
        </GmapMap> -->
  </section>
</template>

<script>
export default {
  name: "TeacherMap"
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
