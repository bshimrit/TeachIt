<script>

import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['reviewsCnt'],
    watch: {
        reviewsCnt: function (val) {
            this.renderChart({
            labels: ['No stars','one star','two stars','three stars','four stars','five stars'],
            datasets: [
                {
                backgroundColor: ['#d7d8d9','#F6DC47','#73D63E','#2F8498','#7D36A4','#F69647'],
                data: val
                }
            ]},
            {position: 'left',legend: {display: true, position:'left', labels: {boxWidth:20, fontfamily: 'MontBold'}},responsive: true, maintainAspectRatio: false})
        },
    }
}
</script>

<style>

</style>
