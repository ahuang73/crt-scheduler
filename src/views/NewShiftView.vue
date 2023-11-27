<script setup lang="ts">
import { CForm, CFormLabel, CFormTextarea, CFormInput, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { ref, onMounted } from 'vue';

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
                <CFormInput v-model="formData.Location" type="text" id="Location" placeholder="" />
            </div>

            <div class="outer">
                Shift Type
                <div>
                    <CDropdown v-model="formData.Type">
                        <CDropdownToggle color="primary" variant="outline" id="Type">{{ formData.Type }}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem v-for="typeOption in TypeOptions" :key="typeOption.Name"
                                @click="formData.Type = typeOption">{{ typeOption }}</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                <CFormLabel for="date"> Start Date </CFormLabel>
                <VueDatePicker v-model="tempData.Start"></VueDatePicker>
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
                            <CDropdownItem v-for="primaryOption in PrimaryOptions" :key="primaryOption"
                                @click="formData.Primary = primaryOption">{{ primaryOption }}</CDropdownItem>
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
                            <CDropdownItem v-for="secondaryOption in SecondaryOptions" :key="secondaryOption"
                                @click="formData.Secondary = secondaryOption">{{ secondaryOption }}
                            </CDropdownItem>
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
                            <CDropdownItem v-for="rookieOption in RookieOptions" :key="rookieOption"
                                @click="formData.Rookie = rookieOption">{{ rookieOption }}</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>
            <CFormLabel for="Description">Description</CFormLabel>
            <CFormTextarea v-model="formData.Description" id="Description" rows="3"></CFormTextarea>
            <div>
                <CFormLabel for="splitlength">Split Length(Minutes)</CFormLabel>
                <CFormInput v-model="tempData.Split" type="text" id="splitlength" placeholder="" />
            </div>
            <CButton type="submit" color="success" value="new_shift">Create</CButton>
        </CForm>

    </div>
</template>


<script lang="ts">
const TypeOptions = ref([]);
const PrimaryOptions = ref([]);
const SecondaryOptions = ref([]);
const RookieOptions = ref([]);

try {
    // Fetch shift_types data and set it in the formData.TypeOptions array
    const shiftTypesResponse = await axios.get('http://localhost:3000/api/shifttypedata');
    TypeOptions.value = shiftTypesResponse.data.map((shiftType: any) => shiftType.Name);

    // Fetch Responders data for Primary, Secondary, and Rookie dropdowns
    const primaries = await axios.get('http://localhost:3000/api/responderdata/Primary');
    PrimaryOptions.value = primaries.data.map((primary: any) => primary.Name);
    const secondaries = await axios.get('http://localhost:3000/api/responderdata/Secondary');
    SecondaryOptions.value = secondaries.data.map((secondary: any) => secondary.Name);
    const rookies = await axios.get('http://localhost:3000/api/responderdata/Rookie');
    RookieOptions.value = rookies.data.map((rookie: any) => rookie.Name);
    console.log(PrimaryOptions.value, SecondaryOptions.value, RookieOptions.value);
} catch (error) {
    console.error('Error fetching data:', error);
}

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

                this.formData.Date = tempStart.getDate() + '-' + (tempStart.getMonth() + 1) + '-' + tempStart.getFullYear()
                this.formData.Start = tempStart.getHours() + ':' + tempStart.getMinutes()
                this.formData.End = tempEnd.getHours() + ':' + tempEnd.getMinutes()

                if(this.formData.Primary == "Primary"){
                    this.formData.Primary = ""
                }
                if(this.formData.Secondary == "Secondary"){
                    this.formData.Secondary = ""
                }
                if(this.formData.Rookie == "Rookie"){
                    this.formData.Rookie = ""
                }
                // Send formData to your backend API to save in MongoDB
                const response = await axios.post('http://localhost:3000/api/shiftsdata', this.formData);
                console.log('Shift created:', response.data, this.formData, this.tempData);

                this.$router.push('/shifts')
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
}</style>