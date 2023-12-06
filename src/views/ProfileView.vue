<script setup lang="ts">
import axios from 'axios';
import { CProgressBar, CProgress, CTable } from '@coreui/vue';
import { ref } from 'vue';
import { Responder, ShiftType, Shift, User } from '@/Classes';
import router from '@/router';
</script>


<template>
    <div class="page-header">
        <h1>
            {{ `${responder[0].Name} (${responder[0].Position})` }}

        </h1>

        <div class="row">
            <div class="well well-small span-6">
                <h4>Certifications</h4>
                <p>SFA expiration date: {{ formatDate(responder[0].SFAexpiry) }}</p>
                <p>BLS expiration date: {{ formatDate(responder[0].BLSexpiry) }}</p>
                <p>FR expiration date: {{ formatDate(responder[0].FRexpiry) }}</p>
                <p>
                </p>
                <p>Based on your expiration dates, you will not be able to take shifts after {{ responder[0].CertExpiration
                }}
                </p>
                <p>Contact the Directors of Administration and Scheduling if you have more recent certifications</p>
            </div>
        </div>

    </div>

    <div v-for="shiftType in shift_types">
        <h6>{{ `${shiftType.Name}: ${pastShiftsHoursByType[shiftType.Name]}/${shiftType.SecondaryReq}` }}</h6>
        <CProgress class="mb-3">
            <CProgressBar :value="(pastShiftsHoursByType[shiftType.Name] / shiftType.SecondaryReq) * 100" />
        </CProgress>


    </div>

    <h1>Upcoming Shifts</h1>
    <p v-if="upcomingShifts?.length === 0">There are no upcoming shifts to display.</p>
    <div v-else>
        <CTable :columns="columns" :items="upcomingShifts" />
    </div>
    <h1>Past Shifts</h1>
    <p v-if="pastShifts?.length === 0">There are no past shifts to display.</p>
    <div v-else>
        <CTable :columns="columns" :items="pastShifts" />
    </div>
</template>

<script lang = "ts">
const responder = ref<Responder[]>();
const shift_types = ref<ShiftType[]>();
const shiftData = ref<Shift[]>();
const upcomingShifts = ref<Shift[]>();
const pastShifts = ref<Shift[]>();
const user = ref<User>();
const pastShiftsHoursByType = ref();
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};
try {
    const userDataString = document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (userDataString) {
        const decodedUserData = decodeURIComponent(userDataString);
        const jsonUser = JSON.parse(decodedUserData);
        user.value = jsonUser;
        const uname = user.value.username;
        const response = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/user/${uname}`);
        responder.value = response.data;

        const shiftTypesResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shifttypedata`);
        shift_types.value = shiftTypesResponse.data;

        for (let shiftType in shift_types.value) {
            if (responder.value[0][shift_types.value[shiftType].Name] == undefined) {
                responder.value[0][shift_types.value[shiftType].Name] = 0
            }


        }
        const responderName = responder.value[0].Name.replace(" ", "+")

        const shiftTableResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata/responder/` + responderName);
        shiftData.value = shiftTableResponse.data;

        upcomingShifts.value = shiftData.value.filter((shift: Shift) => {
            const [day, month, year] = shift.Date.split('-');
            const shiftDate = new Date(`${year}-${month}-${day}`);

            return shiftDate >= new Date();
        });

        pastShifts.value = shiftData.value.filter((shift: Shift) => {
            const [day, month, year] = shift.Date.split('-');
            const shiftDate = new Date(`${year}-${month}-${day}`);
            return shiftDate < new Date();
        });

        pastShiftsHoursByType.value = pastShifts.value.reduce((acc, shift: Shift) => {
            const shiftType = shift.Type;
            const startTime = shift.Start.split(':');
            const endTime = shift.End.split(':');
            const shiftHours = (parseInt(endTime[0]) + parseInt(endTime[1]) / 60) - (parseInt(startTime[0]) + parseInt(startTime[1]) / 60);

            acc[shiftType] = (acc[shiftType] || 0) + shiftHours;
            return acc;
        }, {});
        console.log(pastShiftsHoursByType.value)
        shift_types.value.forEach((shiftType) => {
            if (!(shiftType.Name in pastShiftsHoursByType.value)) {
                pastShiftsHoursByType.value[shiftType.Name] = 0;
            }
        });
        console.log(pastShiftsHoursByType.value)
    } else {
        router.push('/login')
    }


} catch (error) {
    console.error('Error fetching Responders:', error);
}

export default {
    data: () => {
        return {
            columns: [
                {
                    key: "Date",
                    _props: { scope: "col" },
                },
                {
                    key: "Name",
                    _props: { scope: "col" },
                },
                {
                    key: "Location",
                    _props: { scope: "col" },
                },
                {
                    key: "Start",
                    label: "Start Time",
                    _props: { scope: "col" },
                },
                {
                    key: "End",
                    label: "End Time",
                    _props: { scope: "col" },
                },
                {
                    key: "Primary",
                    _props: { scope: "col" },
                },
                {
                    key: "Secondary",
                    _props: { scope: "col" },
                },
                {
                    key: "Rookie",
                    _props: { scope: "col" },
                },
                {
                    key: "Type",
                    _props: { scope: "col" },
                },
            ]

        };
    },
}
</script>

<style scoped>
.row {
    padding-bottom: 9px;
}

.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}

.page-header {
    padding-bottom: 9px;
    margin: 80px 0 30px;
    border-bottom: 1px solid #eee;
}
</style>