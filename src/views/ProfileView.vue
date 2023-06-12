<script setup lang="ts">
import ProgressBar from '../components/ProgressBar.vue'
import ShiftTable from '../components/ShiftTable.vue'
</script>


<template>
    <div class="page-header">
        <h1>
            Joe Smith (Secondary)
            <!-- <a title="Edit" class="btn btn-primary" href="/users/575/edit"><i class="icon-edit icon-white"></i> Edit
                Responder</a> -->
        </h1>

        <!-- <form class="button" action="/users/toggle_notifications" accept-charset="UTF-8" method="post"><input name="utf8"
                type="hidden" value="✓"><input type="hidden" name="authenticity_token"
                value="b9Xe2ExfNl3/PQDK5Z2a6yflXyUI9zCeiDa+aJU1Kpnc1WJ04HA+p2pKaYv2U9TTg35N8WvZ+B4kfQUccN17WA==">
            <button class="btn"><i class="icon-envelope"></i> Enable New Shift Notifications</button>
        </form> -->
        <div class="row">
            <div class="well well-small span-6">
                <h4>Certifications</h4>
                <p>SFA expiration date: 2025-04-24</p>
                <p>BLS expiration date: 2025-08-27</p>
                <p>FR expiration date: 2025-08-27</p>
                <p>
                </p>
                <p>Based on your expiration dates, you will not be able to take shifts after 2025-08-27
                </p>
                <p>Contact the Directors of Administration and Scheduling if you have more recent certifications</p>
            </div>
        </div>
        <ProgressBar></ProgressBar>
        <h1>Upcoming Shifts</h1>
        <p>There are no shifts to display at this time.</p>
        <h1>Past Shifts</h1>
        <ShiftTable></ShiftTable>
    </div>
</template>

<style scoped>
.row {
    padding-bottom: 9px;
    margin: 20px 0 30px;
    border-bottom: 1px solid #eee;
}
</style>