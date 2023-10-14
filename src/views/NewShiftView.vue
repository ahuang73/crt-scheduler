<script setup lang="ts">
import { CForm, CFormLabel, CFormTextarea, CFormInput, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


</script>

<template>
    <div class="page-header">
        <h1>New Shift</h1>
    </div>
    <div class="well">
        <CForm @submit="submitForm">
            <div class="outer">
                <CFormLabel for="Name">Name</CFormLabel>
                <CFormInput type="text" id="Name" placeholder="" />
            </div>
            <div>
                <CFormLabel for="Location">Location</CFormLabel>
                <CFormInput type="text" id="Location" placeholder="" />
            </div>

            <div class="outer">
                Shift Type
                <div>
                    <CDropdown v-model="formData.Type">
                        <CDropdownToggle color="primary" variant="outline" id="Type"> Shift Type</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem value="Regular">Regular</CDropdownItem>
                            <CDropdownItem value="Supervisor">Supervisor</CDropdownItem>
                            <CDropdownItem value="Training">Training</CDropdownItem>
                            <CDropdownItem value="Debrief">Debrief</CDropdownItem>
                            <CDropdownItem value="AnP">AnP</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                <CFormLabel for="date"> Start Date </CFormLabel>
                <VueDatePicker v-model="formData.Start"></VueDatePicker>
            </div>

            <div class="outer">
                <CFormLabel for="date"> End Date </CFormLabel>
                <VueDatePicker v-model="formData.End"></VueDatePicker>
            </div>
            <div class="outer">
                Primary
                <div>
                    <CDropdown v-model="formData.Primary">
                        <CDropdownToggle color="primary" variant="outline">Primary</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem value="John">John</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <div class="outer">
                Secondary
                <div>
                    <CDropdown  v-model="formData.Secondary">
                        <CDropdownToggle color="primary" variant="outline">Secondary</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem value="Jack">Jack</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                Rookie
                <div>
                    <CDropdown  v-model="formData.Rookie">
                        <CDropdownToggle color="primary" variant="outline">Rookie</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem value="James">James</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <CFormLabel for="Description"  v-model="formData.Description">Description</CFormLabel>
            <CFormTextarea id="Description" rows="3"></CFormTextarea>
            <div>
                <CFormLabel for="splitlength"  v-model="formData.Split">Split Length(Minutes)</CFormLabel>
                <CFormInput type="text" id="splitlength" placeholder="" />
            </div>
            <CButton color="success" value="new_shift">Create</CButton>
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
                Primary: "",
                Secondary: "",
                Rookie: "",
                Type: "",
                Description: "",
                Split: "",
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                // Send formData to your backend API to save in MongoDB
                const response = await axios.post('/api/shiftdata', this.formData);
                console.log('Shift created:', response.data);

                // Optionally, reset the form after a successful submission
                this.resetForm();
            } catch (error) {
                console.error('Error creating shift:', error);
            }
        },
        resetForm() {
            // Reset form fields to their initial state
            this.formData = {
                Name:"",
                Date: "",
                Location: "",
                Start: "",
                End: "",
                Primary: "",
                Secondary: "",
                Rookie: "",
                Type: "",
                Description: "",
                Split: "",
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