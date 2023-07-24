<script setup lang="ts">
import { CForm, CFormLabel, CFormInput, CButton, CFormCheck } from '@coreui/vue';


</script>

<template>
    <div class="page-header">
        <h1>New Shift Type</h1>
    </div>
    <div class="well">
        <CForm>
            <div class="outer">
                <CFormLabel for="name">Name</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" />
            </div>
            <div>
                <CFormLabel for="primaryreq">Primary Requirement</CFormLabel>
                <CFormInput type="text" id="primaryreq" placeholder="" />
            </div>
            <div class="outer">
                <CFormLabel for="secondaryreq">Secondary Requirement</CFormLabel>
                <CFormInput type="text" id="secondaryreq" placeholder="" />
            </div>
            <div>
                <CFormLabel for="name">Days Preceeding for Shift to Become Critical</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" />
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" label="Secondary responders can take the primary slot for shifts of this type"/>
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" label="Responders with expired certs can take shifts of this type"/>
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" label="Suspended responders can take shifts of this type"/>
            </div>
            <CButton color="success" value="new_shift">Create</CButton>
        </CForm>
    </div>
</template>

<style scoped>
.page-header {
    padding-bottom: 9px;
    margin: 80px 0 30px;
    border-bottom: 1px solid #eee;
}
.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>