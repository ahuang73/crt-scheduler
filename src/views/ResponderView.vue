<script setup lang="ts">
    import  { CButton, CForm, CFormInput, CTable } from '@coreui/vue';
</script>

<template>

    <div class="page-header">
        <h1>Responders</h1>
        
    </div>
    
    <CForm>
        
        <CFormInput  type="text" id ="search" label="Search Responder" aria-placeholder="Search Responder"/>
        <CButton color="primary" variant="outline" value = "show_all">New Responder</CButton>
    </CForm>

    <CTable :columns="columns" :items="items" />
       


    
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
                    key: "Supervisor",
                    _props: { scope: "col" },
                },
                {
                    key: "Training",
                    _props: { scope: "col" },
                },
                {
                    key: "Debrief",
                    _props: { scope: "col" },
                },
                {
                    key: "AnP",
                    label:"AnP",
                    _props: { scope: "col" },
                },
                {
                    key: "Regular",
                    _props: { scope: "col" },
                },
                {
                    key: "cert_exp",
                    label:"Cert Expiration",
                    _props: { scope: "col" },
                },
                {
                    key: "Rank",
                    _props: { scope: "col" },
                },
                {
                    key: "Suspended",
                    _props: { scope: "col" },
                },
                {
                    key: "Admin",
                    _props: { scope: "col" },
                },
                {
                    key: "Delete",
                    _props: { scope: "col" },
                },
            ],
            items: [
                {
                    Name: "Test 1",
                    Supervisor: "0.0",
                    Training: "0.0",
                    Debrief: "0.0",
                    AnP: "0.0",
                    Regular:"10.0",
                    cert_exp: "1000 days",
                    Rank: "Primary",
                    Suspended: "Suspended",
                    Admin: "Promote",
                    Delete: "Delete",
                },
                {
                    Name: "Test 2",
                    Supervisor: "0.0",
                    Training: "0.0",
                    Debrief: "0.0",
                    AnP: "0.0",
                    Regular:"0.0",
                    cert_exp: "1000 days",
                    Rank: "Primary",
                    Suspended: "Suspended",
                    Admin: "Promote",
                    Delete: "Delete",
                },
                {
                    Name: "Test 3",
                    Supervisor: "0.0",
                    Training: "0.0",
                    Debrief: "0.0",
                    AnP: "0.0",
                    Regular: "0.0",
                    cert_exp: "1000 days",
                    Rank: "Primary",
                    Suspended: "Suspended",
                    Admin: "Promote",
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