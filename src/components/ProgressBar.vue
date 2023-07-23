<script setup lang="ts">
import { CProgress, CProgressBar } from '@coreui/vue';
</script>
<template>
    <div>
        <h6>Supervisor: 0.0/100.0 (0.0 hours upcoming)</h6>
        <CProgress class="mb-3">
            <CProgressBar :value="0" />
        </CProgress>
        <h6>Training: 25.0/ 100.0 ( 5.0 hours upcoming) </h6>
        <CProgress class="mb-3">          
            <CProgressBar :value="25" />
            <CProgressBar color ="warning" :value="5"/>
        </CProgress>
        <h6>Debrief: 50.0/ 100.0  ( 0.0 hours upcoming)</h6>
        <CProgress class="mb-3">
            <CProgressBar :value="50" />
        </CProgress>
        <h6>AnP: 75.0/ 100.0  ( 0.0 hours upcoming)</h6>
        <CProgress class="mb-3">
            <CProgressBar :value="75" />
        </CProgress>
        <h6>Regular: 100.0/ 100.0  ( 0.0 hours upcoming)</h6>
        <CProgress class="mb-3">
            <CProgressBar :value="100" />
        </CProgress>

    </div>
</template>