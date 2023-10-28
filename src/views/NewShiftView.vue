<script setup lang="ts">
import { CForm, CFormLabel, CFormTextarea, CFormInput, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { ref } from 'vue';

</script>

<template>
    <div class="page-header">
        <h1>New Shift</h1>
    </div>
    <div class="well">
        <CForm @submit="submitForm">
            <div class="outer">
                <CFormLabel for="Name">Name</CFormLabel>
                <CFormInput v-model="formData.Name" type="text" id="Name" placeholder="" />
            </div>
            <div>
                <CFormLabel for="Location">Location</CFormLabel>
                <CFormInput v-model="formData.Location"  type="text" id="Location" placeholder="" />
            </div>

            <div class="outer">
                Shift Type
                <div>
                    <CDropdown v-model="formData.Type">
                        <CDropdownToggle color="primary" variant="outline" id="Type">{{ formData.Type }}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem @click="formData.Type = 'Regular'">Regular</CDropdownItem>
                            <CDropdownItem @click="formData.Type = 'Supervisor'">Supervisor</CDropdownItem>
                            <CDropdownItem @click="formData.Type = 'Training'">Training</CDropdownItem>
                            <CDropdownItem @click="formData.Type = 'Debrief'">Debrief</CDropdownItem>
                            <CDropdownItem @click="formData.Type = 'AnP'">AnP</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                <CFormLabel for="date"> Start Date </CFormLabel>
                <VueDatePicker v-model="tempData.Start" ></VueDatePicker>
            </div>

            <div class="outer">
                <CFormLabel for="date"> End Date </CFormLabel>
                <VueDatePicker v-model="tempData.End"></VueDatePicker>
            </div>
            <div class="outer">
                Primary
                <div>
                    <CDropdown v-model="formData.Primary">
                        <CDropdownToggle color="primary" variant="outline">{{ formData.Primary }}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem @click="formData.Primary = 'John'">John</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <div class="outer">
                Secondary
                <div>
                    <CDropdown v-model="formData.Secondary">
                        <CDropdownToggle color="primary" variant="outline">{{ formData.Secondary }}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem @click="formData.Secondary = 'Jack'">Jack</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                Rookie
                <div>
                    <CDropdown v-model="formData.Rookie">
                        <CDropdownToggle color="primary" variant="outline">{{ formData.Rookie }}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem @click="formData.Rookie = 'James'">James</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <CFormLabel for="Description" >Description</CFormLabel>
            <CFormTextarea v-model="formData.Description" id="Description" rows="3"></CFormTextarea>
            <div>
                <CFormLabel for="splitlength" >Split Length(Minutes)</CFormLabel>
                <CFormInput v-model="tempData.Split" type="text" id="splitlength" placeholder="" />
            </div>
            <CButton type="submit" color="success" value="new_shift">Create</CButton>
        </CForm>

    </div>
</template>


<script lang="ts">

export default {
    components: { VueDatePicker },
    data() {
        return {
            formData: {
                Name: "",
                Date: "",
                Location: "",
                Start: "",
                End: "",
                Primary: "Primary",
                Secondary: "Secondary",
                Rookie: "Rookie",
                Type: "Select",
                Description: "",
                
            },
            tempData: {
                Start: ref(new Date()),
                End: ref(new Date()),
                Split: "",
            }
        };
    },
    methods: {
        async submitForm() {
            event?.preventDefault();
            try {

                let tempStart = this.tempData.Start
                let tempEnd = this.tempData.End
                //Still need to handle start/end dates not being equal here
                
                this.formData.Date = tempStart.getDate()+'-'+tempStart.getMonth()+ '-'+tempStart.getFullYear()
                this.formData.Start= tempStart.getHours()+':'+tempStart.getMinutes() 
                this.formData.End = tempEnd.getHours()+':'+tempEnd.getMinutes()


                // Send formData to your backend API to save in MongoDB
                const response = await axios.post('http://localhost:3000/api/shiftsdata', this.formData);
                console.log('Shift created:', response.data, this.formData,this.tempData);
                

                
                //this.resetForm();
            } catch (error) {
                console.error('Error creating shift:', error);
            }
        },
  

        resetForm() {
            // Reset form fields to their initial state
            this.formData = {
                Name: "",
                Date: "",
                Location: "",
                Start: "",
                End: "",
                Primary: "",
                Secondary: "",
                Rookie: "",
                Type: "",
                Description: "",

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

.outer {
    margin-top: 10px;
}
</style>