
<script setup lang="ts">
import { CForm, CFormLabel, CFormTextarea, CFormInput, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';

</script>

<template>
    <div class="page-header">
        <h1>New Shift</h1>
    </div>
    <div class="well">
        <CForm @submit="submitForm">
            <div class="outer">
                <CFormLabel for="Name">Name</CFormLabel>
                <CFormInput v-model="formData.Name" type="text" id="Name" placeholder="" required />
            </div>
            <div>
                <CFormLabel for="Location">Location</CFormLabel>
                <CFormInput v-model="formData.Location" type="text" id="Location" placeholder="" required />
            </div>

            <div class="outer">
                Shift Type
                <div>
                    <CDropdown v-model="formData.Type">
                        <CDropdownToggle color="primary" variant="outline" id="Type" required>{{ formData.Type }}
                        </CDropdownToggle>
                        <CDropdownMenu>

                            <CDropdownItem v-for="typeOption in TypeOptions" :key="
                                //@ts-ignore
                                typeOption.Name" @click="formData.Type = typeOption">{{ typeOption }}</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </div>

            <div class="outer">
                <CFormLabel for="date"> Start Date </CFormLabel>
                <VueDatePicker v-model="tempData.Start" required></VueDatePicker>
            </div>

            <div class="outer">
                <CFormLabel for="date"> End Date </CFormLabel>
                <VueDatePicker v-model="tempData.End" required></VueDatePicker>
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
import { User } from '@/Classes';
const TypeOptions = ref([]);
const PrimaryOptions = ref([]);
const SecondaryOptions = ref([]);
const RookieOptions = ref([]);
const user = ref<User>();

try {
    const userDataString = document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (userDataString) {
        const decodedUserData = decodeURIComponent(userDataString);
        const jsonUser = JSON.parse(decodedUserData);
        user.value = jsonUser;
        const uname = user.value?.username;

    } else {
        router.push('/login')
    }
    const shiftTypesResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
    TypeOptions.value = shiftTypesResponse.data.map((shiftType: any) => shiftType.Name);

    const primaries = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Primary`);
    PrimaryOptions.value = primaries.data.map((primary: any) => primary.Name);
    const secondaries = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Secondary`);
    SecondaryOptions.value = secondaries.data.map((secondary: any) => secondary.Name);
    const rookies = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Rookie`);
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
                TotalHours: 0.0,

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
                if (!this.validateForm()) {
                    return;
                }   
                axios.defaults.withCredentials = true
                let tempStart = this.tempData.Start
                let tempEnd = this.tempData.End

                this.formData.Date = tempStart.getDate() + '-' + (tempStart.getMonth() + 1) + '-' + tempStart.getFullYear()
                this.formData.Start = tempStart.getHours() + ':' + tempStart.getMinutes()
                this.formData.End = tempEnd.getHours() + ':' + tempEnd.getMinutes()
                this.formData.TotalHours = tempEnd.getHours() - tempStart.getHours() + (tempEnd.getMinutes() - tempStart.getMinutes()) / 60.0
                if (this.formData.Primary == "Primary") {
                    this.formData.Primary = ""
                }
                if (this.formData.Secondary == "Secondary") {
                    this.formData.Secondary = ""
                }
                if (this.formData.Rookie == "Rookie") {
                    this.formData.Rookie = ""
                }

                const response = await axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata`, this.formData);
                console.log('Shift created:', response.data, this.formData, this.tempData);

                this.$router.push('/shifts')
                setTimeout(() => {
                    window.location.reload();
                }, 10);


            } catch (error) {
                console.error('Error creating shift:', error);
            }
        },
        validateForm() {
            // Check if the mandatory fields are filled
            if (!this.formData.Name || !this.formData.Location || !this.tempData.Start || !this.tempData.End) {
                alert('Please fill in all mandatory fields.');
                return false;
            }

            // Check if End date is not before Start date
            const startDate = new Date(this.tempData.Start);
            const endDate = new Date(this.tempData.End);
            if (endDate <= startDate) {
                alert('End date cannot be before Start date.');
                return false;
            }

            return true;
        },

        resetForm() {
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
                TotalHours: 0,

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