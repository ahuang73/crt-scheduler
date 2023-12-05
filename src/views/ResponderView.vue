<script setup lang="ts">
import { ShiftType, Responder } from '@/Classes';
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
          <th scope="col">Rank</th>
          <th scope="col">Suspended</th>
          <th scope="col">Admin</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="responder in responders">
          <td>{{ responder.Name }}</td>
          <td v-for="name in shiftTypeColumns">{{responder[name] }}</td>
          <td>{{ responder.CertExpiration }}</td>
          <td>{{ responder.Position }}</td>
          <td>
            <CButton @click="handleSuspendedButtonClick(responder)" color="secondary" >Suspend</CButton>
          </td>
          <td>
            <CButton @click="handleAdminButtonClick(responder)" color="secondary">Make Admin</CButton>
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
const shiftTypes = ref([]);
const columns = ref([]);
const shiftTypeColumns = ref([]);
const handleSuspendedButtonClick = (item) => {
  // Handle button click for the "Suspended" column
  console.log('Suspended button clicked for item:', item);
};

const handleAdminButtonClick = (item) => {
  // Handle button click for the "Admin" column
  console.log('Admin button clicked for item:', item);
};

const handleDeleteButtonClick = (item) => {
  // Handle button click for the "Delete" column
  console.log('Delete button clicked for item:', item);
};
try {

    const response = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata`);
    let responderData = response.data.map((data: any) => new Responder(data)); // create a new Responder instance for each data
    const response2 = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
    shiftTypes.value = response2.data;


    console.log(responders)
    shiftTypeColumns.value = response2.data.map((shiftType: ShiftType) => shiftType.Name)



    responders.value = responderData.map((responder: any) => {
        let obj: any = {};
        for (let key in responder) {
            
            obj[key] = responder[key];
            
        }
        for (let key2 in shiftTypeColumns.value ){
            if(responder[shiftTypeColumns.value[key2]] != undefined){
                obj[shiftTypeColumns.value[key2]] = responder[shiftTypeColumns.value[key2]];
            } 
            else{
                obj[shiftTypeColumns.value[key2]] = 0;
            }   
        }
        if (!obj.hasOwnProperty('certExpiration')) {
            obj.certExpiration = responder.getCertExpiration();
        }
        console.log(obj)
        return obj;
    });
    
    console.log(responders.value);

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