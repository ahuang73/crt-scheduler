<script setup lang="ts">
import {
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CButton,
} from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';
import { Shift, User } from '../Classes';

const TypeOptions = ref([]);
const PrimaryOptions = ref([]);
const SecondaryOptions = ref([]);
const RookieOptions = ref([]);
const user = ref<User>();
const shiftId = ref();
const shiftData = ref<Shift>();
const formData = ref({
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
});
const tempData = ref({
  Start: new Date(),
  End: new Date(),
  Split: "",
});

const submitForm =  () => {
  try {
    let tempStart = tempData.value.Start;
    let tempEnd = tempData.value.End;

    formData.value.Date = `${tempStart.getDate()}-${tempStart.getMonth() + 1}-${tempStart.getFullYear()}`;
    formData.value.Start = `${tempStart.getHours()}:${tempStart.getMinutes()}`;
    formData.value.End = `${tempEnd.getHours()}:${tempEnd.getMinutes()}`;
    formData.value.TotalHours = tempEnd.getHours() - tempStart.getHours() + (tempEnd.getMinutes() - tempStart.getMinutes()) / 60.0;
    if (formData.value.Primary == "Primary") {
      formData.value.Primary = "";
    }
    if (formData.value.Secondary == "Secondary") {
      formData.value.Secondary = "";
    }
    if (formData.value.Rookie == "Rookie") {
      formData.value.Rookie = "";
    }

    const response = axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata/update/${shiftId.value}`, formData.value);

    router.push('/shifts');
   
    setTimeout(() => {
                    window.location.reload();
                }, 10);
  } catch (error) {
    console.error('Error updating shift:', error);
  }
};

const resetForm = () => {
  formData.value = {
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
  };
};

onMounted(async () => {
  try {
    axios.defaults.withCredentials=true
    shiftId.value = window.location.pathname.split('/').pop();
    console.log(shiftId);

    const userDataString = document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (userDataString) {
      const decodedUserData = decodeURIComponent(userDataString);
      const jsonUser = JSON.parse(decodedUserData);
      user.value = jsonUser;
      const uname = user.value.username;

    } else {
      router.push('/login');
    }

    
    const shiftTypesResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
    TypeOptions.value = shiftTypesResponse.data.map((shiftType: any) => shiftType.Name);

    const primaries = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Primary`);
    PrimaryOptions.value = primaries.data.map((primary: any) => primary.Name);
    const secondaries = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Secondary`);
    SecondaryOptions.value = secondaries.data.map((secondary: any) => secondary.Name);
    const rookies = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/Rookie`);
    RookieOptions.value = rookies.data.map((rookie: any) => rookie.Name);


    const shiftResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata/${shiftId.value}`);
    shiftData.value = new Shift(shiftResponse.data[0]);


    formData.value = {
      Name: shiftData.value?.Name || "",
      Date: shiftData.value?.Date || "",
      Location: shiftData.value?.Location || "",
      Start: shiftData.value?.Start || "",
      End: shiftData.value?.End || "",

      Primary: shiftData.value?.Primary || "Primary",
      Secondary: shiftData.value?.Secondary || "Secondary",
      Rookie: shiftData.value?.Rookie || "Rookie",
      Type: shiftData.value?.Type || "Regular",
      Description: shiftData.value?.Description || "",
      TotalHours: shiftData.value?.TotalHours || 0.0,
    };
    tempData.value = {
      Start: new Date(`${shiftData.value?.Date} ${shiftData.value?.Start}`),
      End: new Date(`${shiftData.value?.Date} ${shiftData.value?.End}`),
      Split: "",
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="page-header">
    <h1>Edit Shift</h1>
  </div>
  <div class="well">
    <CForm @submit="submitForm">
      <div class="outer">
        <CFormLabel for="Name">Name</CFormLabel>
        <CFormInput v-model="formData.Name" type="text" id="Name" placeholder="">{{ shiftData?.Name }} </CFormInput>
      </div>
      <div>
        <CFormLabel for="Location">Location</CFormLabel>
        <CFormInput v-model="formData.Location" type="text" id="Location" placeholder="">{{ shiftData?.Location }}
        </CFormInput>
      </div>

      <div class="outer">
        Shift Type
        <div>
          <CDropdown v-model="formData.Type">
            <CDropdownToggle color="primary" variant="outline" id="Type">{{ formData.Type }}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem v-for="typeOption in TypeOptions" :key="typeOption.Name" @click="formData.Type = typeOption">
                {{ typeOption }}</CDropdownItem>
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
      <CButton type="submit" color="success" value="update_shift">Update</CButton>
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

.outer {
  margin-top: 10px;
}
</style>
