<template>
  <section class="map-container">
      <div class="map">
      <GmapMap
        :center="{lat:32.08, lng:34.79}"
        :zoom="13"
        map-type-id="terrain"
        style="width: 100%; height: 100%; border: 1px solid #577594"
        >
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false"  @mouseout="toggleInfoWindow(m,index)">
             <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
        </gmap-info-window>
            <GmapMarker :key="index" 
                v-for="(m, index) in teacherTopics" 
                :clickable="true"
                :position="{lat: m.topicLocation.coordinates[0], lng: m.topicLocation.coordinates[1]}"
                @mouseover="toggleInfoWindow(m,index)" >
            </GmapMarker>
        </GmapMap>
      </div>
  </section>
</template>

<script>
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'

export default {
  name: "TeacherMap",
  props: ['teacherTopics'],
  data() {
      return {
        infoWinOpen: false,
        infoWindowPos: {
            lat: 0,
            lng: 0
          },
        infoContent: '',
        currentMidx: null,
        infoOptions: {
            pixelOffset: {
                width: 0,
                height: -35
                }
        },
        teacherTopic: null
      }
  },
  methods: {
      toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = {lat: marker.topicLocation.coordinates[0], lng: marker.topicLocation.coordinates[1]};
            console.log(marker)
            this.teacherTopic = marker;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }
    }
  },
  components: {
      TeacherTopic
  }
}
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
