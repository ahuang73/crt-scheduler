<script setup lang="ts">
import { CForm, CFormLabel, CFormInput, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { ref } from 'vue';
</script>

<template>
    <div class="page-header">
        <h1>New Responder</h1>
    </div>
    <div class="well">
        <CForm @submit="submitForm">
            <div class="outer">
                <CFormLabel for="fname">Name</CFormLabel>
                <CFormInput type="text" id="name" v-model="formData.Name" placeholder="" />
            </div>
            <div class="outer">
                <CFormLabel for="username">Username</CFormLabel>
                <CFormInput type="text" v-model="formData.Username" id="username" placeholder="" />
            </div>

            <div class="outer">
                Position
                <div>
                    <CDropdown>
                        <CDropdownToggle color="primary" variant="outline">{{ formData.Position }}</CDropdownToggle>
                        <CDropdownMenu v-model="formData.Position">
                            <CDropdownItem @click="formData.Position = 'Rookie'">Rookie</CDropdownItem>
                            <CDropdownItem @click="formData.Position = 'Secondary'">Secondary</CDropdownItem>
                            <CDropdownItem @click="formData.Position = 'Primary'">Primary</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <div class="outer">
                <CFormLabel for="date"> SFA Expiry </CFormLabel>
                <VueDatePicker v-model="sfaexpiry" :format="format"></VueDatePicker>
            </div>

            <div class="outer">
                <CFormLabel for="date"> BLS Expiry </CFormLabel>
                <VueDatePicker v-model="blsexpiry" :format="format"></VueDatePicker>
            </div>

            <div class="outer">
                <CFormLabel for="date"> FR Expiry </CFormLabel>
                <VueDatePicker v-model="frexpiry" :format="format"></VueDatePicker>
            </div>

            <CButton color="success" value="new_shift" type="submit">Sign Up</CButton>
        </CForm>
    </div>
</template>
<script lang="ts">
const sfaexpiry = ref(new Date())
const blsexpiry = ref(new Date())
const frexpiry = ref(new Date())
const format = (date: { getMonth: () => number; getFullYear: () => any; }) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${year}`;
}

export default {
    components: { VueDatePicker },

    data() {
        return {
            formData: {
                Username: "",
                Name: "",
                Supervisor: 0,
                Training: 0,
                Debrief: 0,
                Anp: 0,
                Regular: 0,
                Position: "Rookie",
                SFAexpiry: sfaexpiry,
                BLSexpiry: blsexpiry,
                FRexpiry: frexpiry,
            }
        };
    },
    methods: {
        async submitForm() {
            event?.preventDefault()
            try {


                // Send formData to your backend API to save in MongoDB
                const response = await axios.post('http://localhost:3000/api/responderdata', this.formData);
                console.log('Responder Created:', response.data, this.formData);

                this.$router.push('/responders')
                setTimeout(() => {
                    window.location.reload();
                }, 10);


                //this.resetForm();
            } catch (error) {
                console.error('Error creating shift:', error);
            }
        },


        resetForm() {
            // Reset form fields to their initial state
            this.formData = {
                Username: "",
                Name: "",
                Supervisor: 0,
                Training: 0,
                Debrief: 0,
                Anp: 0,
                Regular: 0,
                Position: "Rookie",
                SFAexpiry: new Date(),
                BLSexpiry: new Date(),
                FRexpiry: new Date(),
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