<script setup lang="ts">
import ProgressBar from '../components/ProgressBar.vue'
import ShiftTable from '../components/ShiftTable.vue'
</script>


<template>
    <div class="page-header">
        <h1>
            John Doe (Secondary)

        </h1>

        <div class="row">
            <div class="well well-small span-6">
                <h4>Certifications</h4>
                <p>SFA expiration date: yyyy-mm-dd</p>
                <p>BLS expiration date: yyyy-mm-dd</p>
                <p>FR expiration date: yyyy-mm-dd</p>
                <p>
                </p>
                <p>Based on your expiration dates, you will not be able to take shifts after yyyy-mm-dd
                </p>
                <p>Contact the Directors of Administration and Scheduling if you have more recent certifications</p>
            </div>
        </div>
       
    </div>
    <ProgressBar></ProgressBar>
        <h1>Upcoming Shifts</h1>
        <p>There are no shifts to display at this time.</p>
        <h1>Past Shifts</h1>
    <ShiftTable></ShiftTable>
</template>

<style scoped>
.row {
    padding-bottom: 9px;
}
.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
}
.page-header {
    padding-bottom: 9px;
    margin: 80px 0 30px;
    border-bottom: 1px solid #eee;
}
</style>