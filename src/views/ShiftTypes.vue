//@ts-nocheck
<script setup lang="ts">
import { CButton, CTable } from '@coreui/vue';
import axios from 'axios';
import { ref } from 'vue';
import { ShiftType } from '../Classes';
</script>

<template>
    <div class="page-header">
        <h1>Shift Types</h1>
    </div>
    <div>
        <CButton @click="$router.push('shift_types/new')" color="success" value="show_all">New Shift Type</CButton>
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Primary Requirement</th>
                    <th>Secondary Requirement</th>
                    <th>Critical Time</th>
                    <th>Hours Taken</th>
                    <th>Naughty List</th>
                    <th>Default?</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(shiftType, index) in shift_types" :key="index">
                    <td>{{ shiftType.Name }}</td>
                    <td>{{ shiftType.PrimaryReq }}</td>
                    <td>{{ shiftType.SecondaryReq }}</td>
                    <td>{{ shiftType.CriticalTime }}</td>
                    <td>{{ shiftType.HoursTaken }}</td>
                   
                    <td>
                        
                        <button @click="handleNaughtyListEdit(index)">Edit Naughty List</button>
                    </td>
                    <td>
                        
                        <button @click="handleDefaultEdit(index)">Make Default</button>
                    </td>
                    <td>
                       
                        <button @click="handleDelete(index)">Delete</button>
                    </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
const shift_types = ref<ShiftType[]>([]);
try {
    axios.defaults.withCredentials=true
    const response = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
    shift_types.value = response.data;
    console.log(shift_types.value)
} catch (error) {
    console.error('Error fetching shift types:', error);
}

const handleNaughtyListEdit = (index: any) => {
    console.log('Edit Naughty List for item:', shift_types.value[index]);
};

const handleDefaultEdit = (index: any) => {
    console.log('Make Default for item:', shift_types.value[index]);
};

const handleDelete = async (index: any) => {
    try {
        const shiftTypeToDelete = shift_types.value[index];
        console.log('Deleting item:', shiftTypeToDelete)
        await axios.delete(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata/delete/${shiftTypeToDelete._id}`);
        shift_types.value.splice(index, 1);
        
        console.log('Deleted item:', shiftTypeToDelete);
    } catch (error) {
        console.error('Error deleting shift type:', error);
    }
};

export default {
    data: () => {
        return {
            scheduler: true,
            columns: [
                {
                    key: "Name",
                    _props: { scope: "col" },
                },
                {
                    key: "PrimaryReq",
                    label: "Primary Requirement",
                    _props: { scope: "col" },
                },
                {
                    key: "SecondaryReq",
                    label: "Secondary Requirement",
                    _props: { scope: "col" },
                },
                {
                    key: "CriticalTime",
                    label: "Critical Time",
                    _props: { scope: "col" },
                },
                {
                    key: "HoursTaken",
                    label: "Hours Taken",
                    _props: { scope: "col" },
                },
                {
                    key: "NaughtyList",
                    label: "Naughty List",
                    _props: { scope: "col" },
                },
                {
                    key: "Default",
                    label: "Default?",
                    _props: { scope: "col" },
                },
                {
                    key: "Delete",
                    _props: { scope: "col" },
                },
            ],
            items: [
                {
                    Name: "Supervisor",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Training",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Debrief",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "AnP",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
                {
                    Name: "Regular",
                    PrimaryReq: "0.0",
                    SecondaryReq: "1.0",
                    CriticalTime: "0 Days",
                    HoursTaken: "0 Hours Taken",
                    NaughtyList: "Naughty List",
                    Default: "Make Default",
                    Delete: "Delete",
                },
            ]
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

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border: none;
    /* Remove the table outline */
}

th {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

td {
    border: none;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

button {
    padding: 6px 12px;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

button:hover {
    background-color: #2ca02c;
    border-color: #2ca02c;
    color: #fff;
}
</style>


