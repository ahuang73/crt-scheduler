
<script setup lang="ts">
import { ShiftType, Responder, Shift } from '@/Classes';
import { CButton, CForm, CFormInput, CTable } from '@coreui/vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

</script>

<template>
  <div class="page-header">
    <h1>Responders</h1>

  </div>

  <CForm>

    <CFormInput type="text" id="search" label="Search Responder" aria-placeholder="Search Responder" />
    <CButton @click="$router.push('responders/new')" color="primary" variant="outline" value="show_all">New Responder
    </CButton>
  </CForm>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th v-for="name in shiftTypeColumns" scope="col">{{ name }}</th>
        <th scope="col">Cert Expiration</th>
        <th scope="col">SFA Expiration</th>
        <th scope="col">BLS Expiration</th>
        <th scope="col">FR Expiration</th>
        <th scope="col">Rank</th>
        <th scope="col">Suspended</th>
        <th scope="col">Admin</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="responder in responders">

        <td>{{
          //@ts-ignore
          responder.Name }}</td>
        <td v-for="shift_types in shiftTypes">{{ pastShiftsHoursByType[shift_types.Name].toFixed(2) }}</td>
        <td>{{
          //@ts-ignore
          responder.certExpiration }}</td>
        <td>{{
          //@ts-ignore
          formatDate(responder.SFAexpiry) }}</td>
        <td>{{
          //@ts-ignore
          formatDate(responder.BLSexpiry) }}</td>
        <td>{{
          //@ts-ignore
          formatDate(responder.FRexpiry) }}</td>
        <td>{{
          //@ts-ignore
          responder.Position }}</td>
        <td>
          <CButton v-if="
            //@ts-ignore
            responder.isSuspended" @click="handleSuspendedButtonClick(responder)" color="secondary">Remove Suspension
          </CButton>
          <CButton v-if="
            //@ts-ignore
            !responder.isSuspended" @click="handleSuspendedButtonClick(responder)" color="secondary">Suspend</CButton>
        </td>
        <td>
          <CButton v-if="
            //@ts-ignore
            responder.isAdmin" @click="handleAdminButtonClick(responder)" color="secondary">Remove Admin</CButton>
          <CButton v-if="
            //@ts-ignore
            !responder.isAdmin" @click="handleAdminButtonClick(responder)" color="secondary">Make Admin</CButton>

        </td>
        <td>
          <CButton @click="handleDeleteButtonClick(responder)" color="secondary">Delete</CButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">


const responders = ref([]);
const shiftTypes = ref<ShiftType[]>();
const columns = ref([]);
const shiftTypeColumns = ref();
const pastShiftsHoursByType = ref();

const upcomingShiftsHoursByType =ref();
const formatDate = (dateString: string) => {
  if (!dateString) return ''; // Handle empty or undefined dates

  const date = new Date(dateString);
  const options = { month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options as Intl.DateTimeFormatOptions);
};

const handleSuspendedButtonClick = async (responder: Responder) => {
  try {
    let newResponder: Responder = responder;
    newResponder.isSuspended = !newResponder.isSuspended;
    const response = await axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/update/user/${responder.Username}`, newResponder);
    console.log('Responder suspended successfully:', response.data);
  } catch (error) {
    console.error('Error suspending responder:', error);
  }
};

const handleAdminButtonClick = async (responder: Responder) => {
  try {
    let newResponder: Responder = responder;
    newResponder.isAdmin = !newResponder.isAdmin;
    const response = await axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/update/user/${responder.Username}`, newResponder);

    console.log('Responder made admin successfully:', response.data);
  } catch (error) {
    console.error('Error making responder admin:', error);
  }
};

const handleDeleteButtonClick = async (responder: Responder) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/delete/user/${responder.Username}`);
    console.log('Responder deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting responder:', error);
  }
};
try {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata`);
  let responderData = response.data.map((data: any) => new Responder(data));
  const response2 = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
  shiftTypes.value = response2.data;


  console.log(responders)
  shiftTypeColumns.value = response2.data.map((shiftType: ShiftType) => shiftType.Name)



  responders.value = responderData.map((responder: any) => {
    let obj: any = {};
    for (let key in responder) {

      obj[key] = responder[key];

    }
    
    for (let key2 in shiftTypeColumns.value) {
      if (responder[shiftTypeColumns.value[key2]] != undefined) {
        obj[shiftTypeColumns.value[key2]] = responder[shiftTypeColumns.value[key2]];
      }
      else {
        obj[shiftTypeColumns.value[key2]] = 0;
      }
    }
    obj.certExpiration = responder.getCertExpiration();

    if (obj.certExpiration < 0) {
      obj.certExpiration = "Expired";
    }

    console.log(obj)
    return obj;
  });

  responders.value.map(async (resp: any) => {
    let responder = new Responder(resp);
    console.log(resp);
    const responderName = responder.Name.replace(" ", "+");
    const certExpiration = responder.getCertExpiration();
    const shiftTableResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata/responder/` + responderName);
    let shiftData = shiftTableResponse.data;

    let upcomingShifts = shiftData.filter((shift: Shift) => {
      const [day, month, year] = shift.Date.split('-');
      const shiftDate = new Date(`${year}-${month}-${day}`);

      return shiftDate >= new Date();
    });
    console.log("Upcoming shifts: ", upcomingShifts);

    let pastShifts = shiftData.filter((shift: Shift) => {
      const [day, month, year] = shift.Date.split('-');
      const shiftDate = new Date(`${year}-${month}-${day}`);
      return shiftDate < new Date();
    });
    console.log("Past shifts: ", pastShifts);
    let pastHours = 0;
    
    pastShiftsHoursByType.value = pastShifts.reduce((acc: any, shift: Shift) => {
      const shiftType = shift.Type;
      const startTime = shift.Start.split(':');
      const endTime = shift.End.split(':');
      const shiftHours = (parseInt(endTime[0]) + parseInt(endTime[1]) / 60) - (parseInt(startTime[0]) + parseInt(startTime[1]) / 60);

      acc[shiftType] = (acc[shiftType] || 0) + shiftHours;

      return acc;
    }, {});

    console.log(pastShiftsHoursByType.value);
    shiftTypes.value?.forEach((shiftType) => {
      if (!(shiftType.Name in pastShiftsHoursByType.value)) {
        pastShiftsHoursByType.value[shiftType.Name] = 0;
      }
    });
    console.log("AFTER LOOP: ",pastShiftsHoursByType.value);

    let upcomingHours = 0;

    upcomingShiftsHoursByType.value = upcomingShifts.reduce((acc: any, shift: Shift) => {
      const shiftType = shift.Type;
      const startTime = shift.Start.split(':');
      const endTime = shift.End.split(':');
      const shiftHours = (parseInt(endTime[0]) + parseInt(endTime[1]) / 60) - (parseInt(startTime[0]) + parseInt(startTime[1]) / 60);
      acc[shiftType] = (acc[shiftType] || 0) + shiftHours;
      upcomingHours += shiftHours;
      return acc;
    }, {});
    console.log(shiftTypes.value)
    shiftTypes.value?.forEach((shiftType) => {
      if (!(shiftType.Name in upcomingShiftsHoursByType.value)) {
        upcomingShiftsHoursByType.value[shiftType.Name] = 0;
      }
    });

  });




} catch (error) {
  console.error('Error fetching Responders:', error);
}

export default {
  data: () => {
    return {
      scheduler: true,
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