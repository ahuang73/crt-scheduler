<script setup lang="ts">
import { CForm, CFormLabel, CFormInput, CButton, CFormCheck } from '@coreui/vue';
import axios from 'axios';


</script>

<template>
    <div class="page-header">
        <h1>New Shift Type</h1>
    </div>
    <div class="well">
        <CForm @submit="submitForm">
            <div class="outer">
                <CFormLabel for="name">Name</CFormLabel>
                <CFormInput type="text" id="name" v-model=formData.Name placeholder="" />
            </div>
            <div>
                <CFormLabel for="primaryreq">Primary Requirement</CFormLabel>
                <CFormInput type="number" id="primaryreq" v-model=formData.PrimaryReq placeholder="" />
            </div>
            <div class="outer">
                <CFormLabel for="secondaryreq">Secondary Requirement</CFormLabel>
                <CFormInput type="number" id="secondaryreq" v-model=formData.SecondaryReq placeholder="" />
            </div>
            <div>
                <CFormLabel for="name">Days Preceeding for Shift to Become Critical</CFormLabel>
                <CFormInput type="number" id="name" v-model="formData.CriticalTime " placeholder="" />
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" v-model=formData.SecondaryFlag label="Secondary responders can take the primary slot for shifts of this type"/>
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" v-model=formData.ExpiredFlag label="Responders with expired certs can take shifts of this type"/>
            </div>
            <div>
                <CFormCheck id="flexCheckDefault" v-model=formData.SuspendedFlag label="Suspended responders can take shifts of this type"/>
            </div>
            <CButton type="submit" color="success" value="new_shift">Create</CButton>
        </CForm>
    </div>
</template>

<script lang = 'ts'>
export default {
    data() {
        return {
            formData: {
                Name: "",
                PrimaryReq:"",
                SecondaryReq:"",
                CriticalTime:"",
                SecondaryFlag:false,
                ExpiredFlag:false,
                SuspendedFlag:false


            }
        };
    },
    methods: {
        async submitForm() {
            event?.preventDefault();
            try {
                const response = await axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`, this.formData);
                console.log('Shift Type Created:', response.data, this.formData);

                this.$router.push('/shift_types')
                setTimeout(() => {
                    window.location.reload();
                }, 10);

            } catch (error) {
                console.error('Error creating shift:', error);
            }
        },


        resetForm() {
            this.formData = {
                Name: "",
                PrimaryReq:"",
                SecondaryReq:"",
                CriticalTime:"",
                SecondaryFlag:false,
                ExpiredFlag:false,
                SuspendedFlag:false
            };

        }

    }
}

</script>
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