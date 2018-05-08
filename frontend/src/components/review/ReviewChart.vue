<script>

import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['reviews'],
    watch: {
        reviews: function (val) {
            this.renderChart({
            labels: ['No stars','one star','two stars','three stars','four stars','five stars'],
            datasets: [
                {
                backgroundColor: ['#d7d8d9','#F6DC47','#73D63E','#2F8498','#7D36A4','#F69647'],
                data: this.$store.getters.reviewsCntDisplay
                }
            ]},
            {position: 'left',legend: {display: false},responsive: true, maintainAspectRatio: false})
    },
    }
}
</script>

<style>

</style>
