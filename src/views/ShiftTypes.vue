<script setup lang="ts">
import { CButton, CTable } from '@coreui/vue';

</script>

<template>
    <div class="page-header">
        <h1>Shift Types</h1>
    </div>
    <div>
        <CButton color="primary" variant="outline" value = "show_all">Show All Shifts</CButton>
        <CTable :columns="columns" :items="items" />
    </div>
</template>
<script lang="ts">
  export default {
    data: () => {
        return {
            scheduler: true,
            columns: [
                {
                    key: "Name",
                    _props: { scope: "col" },
                },
                {
                    key: "PrimaryReq",
                    label:"Primary Requirement",
                    _props: { scope: "col" },
                },
                {
                    key: "SecondaryReq",
                    label: "Secondary Requirement",
                    _props: { scope: "col" },
                },
                {
                    key: "CriticalTime",
                    label: "Critical Time",
                    _props: { scope: "col" },
                },
                {
                    key: "HoursTaken",
                    label:"Hours Taken",
                    _props: { scope: "col" },
                },
                {
                    key: "NaughtyList",
                    label: "Naughty List",
                    _props: { scope: "col" },
                },
                {
                    key: "Default",
                    label: "Default?",
                    _props: { scope: "col" },
                },
                {
                    key: "Delete",
                    _props: { scope: "col" },
                },
            ],
            items: [
                {
                    Name: "Supervisor",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Training",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Debrief",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "AnP",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Regular",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
            ]
        };
    },
    components: { CButton }
}
</script>
<style scoped>
    .page-header {
        padding-bottom: 9px;
        margin: 80px 0 30px;
        border-bottom: 1px solid #eee;
    }
</style>


