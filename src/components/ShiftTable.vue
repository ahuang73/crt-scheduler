<script setup lang="ts">
    import {CButton, CTable} from '@coreui/vue';
    
</script>

<template>
    <CTable :columns="columns" :items="items" />




</template>


<script lang="ts">
  export default {
    data: () => {
        return {
            columns: [
                {
                    key: "Date",
                    _props: { scope: "col" },
                },
                {
                    key: "Name",
                    _props: { scope: "col" },
                },
                {
                    key: "Location",
                    _props: { scope: "col" },
                },
                {
                    key: "Start",
                    label: "Start Time",
                    _props: { scope: "col" },
                },
                {
                    key: "End",
                    label: "End Time",
                    _props: { scope: "col" },
                },
                {
                    key: "Primary",
                    _props: { scope: "col" },
                },
                {
                    key: "Secondary",
                    _props: { scope: "col" },
                },
                {
                    key: "Rookie",
                    _props: { scope: "col" },
                },
                {
                    key: "Type",
                    _props: { scope: "col" },
                },
            ],
            items: [
                {
                    Date: "Tues Jan 10",
                    Name: "Test Shift",
                    Location: "Otto",
                    Start: "11:00",
                    End: "23:00",
                    Primary: "p1",
                    Secondary: "s1",
                    Rookie: "r1",
                    Type: "Regular"
                },
                {
                    Date: "Wed Jan 11",
                    Name: "Test Shift 2",
                    Location: "Otto",
                    Start: "11:00",
                    End: "23:00",
                    Primary: "p2",
                    Secondary: "s2",
                    Rookie: "r2",
                    Type: "Regular"
                },
                {
                    id: 3,
                    class: "Larry the Bird",
                    heading_2: "@twitter",
                    _cellProps: { id: { scope: "row" }, class: { colSpan: 2 } },
                },
            ]
        };
    },
    components: { CButton }
}
</script>
<style scoped>
</style>