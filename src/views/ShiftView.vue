<script setup lang="ts">
import { CButton, CTable, CProgress, CProgressBar } from '@coreui/vue';

</script>

<template>
    <div class="middle">
        <div class="well">
            <h1>Shifts</h1>
            <p>
                You will only be able to take shifts which you meet the criteria for. The restrictions are...
            </p>
            <ul>
                <li>
                    If you are suspended you cannot take any shifts
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>You cannot take a shift that conflicts with another shift you already have</li>
                <li>
                    If you are a secondary you cannot take a primary shift
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>
                    If you are a primary you cannot take a secondary shift until it is critical and the primary spot is
                    taken
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>If your total hours (past + future) meet the quota you cannot take a shift until it is critical</li>
                <li>Supervisor shifts are never critical</li>
                <li>Training shifts become critical 30 days before they start</li>
                <li>Debrief shifts are never critical</li>
                <li>AnP shifts become critical 7 days before they start</li>
                <li>Regular shifts become critical 40 days before they start</li>
            </ul>
            <p>
                You can see a report of your hours and shifts by clicking "profile" in the navigation bar.
            </p>
            <p>
                If a shift changes or is cancelled, those affected will be notified by telephone or e-mail and details will
                be
                posted here within 24 hours of the shift. If you notice any errors, please contact the Director of
                Scheduling
                ASAP.
            </p>
        </div>
        <CButton @click="$router.push('shifts/new')" v-if="scheduler" color="success" value="new_shift">New Shift</CButton>
        <CButton color="primary" variant="outline" value="show_all" @click="showAllShifts">Show All Shifts</CButton>
        <CButton color="primary" variant="outline" value="show_current" @click="showCurrShifts">Show Current Shifts
        </CButton>
        <div class="shift-table">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Primary</th>
                        <th scope="col">Secondary</th>
                        <th scope="col">Rookie</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="shift in filteredShifts" :key="shift._id">
                        <td>{{ shift.Date }}</td>
                        <td>{{ shift.Name }}</td>
                        <td>{{ shift.Location }}</td>
                        <td>{{ shift.Start }}</td>
                        <td>{{ shift.End }}</td>
                        <td v-if="shift.Primary === '' && currentResponder[0].Position == 'Primary'" class="text-start">
                            <CButton @click="takeShift(shift)" class="text-start">Take Shift</CButton>
                        </td>
                        <td v-else>{{ shift.Primary }}</td>
                        <td v-if="shift.Secondary === '' && currentResponder[0].Position=='Secondary' " class="text-start">
                            <CButton @click="takeShift(shift)" class="text-start">Take Shift</CButton>
                        </td>
                        <td v-else>{{ shift.Secondary }}</td>
                        <td v-if="shift.Rookie === '' && currentResponder[0].Position == 'Rookie'" class="text-start">
                            <CButton @click="takeShift(shift)" class="text-start">Take Shift</CButton>
                        </td>
                        <td>{{ shift.Type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>


<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Responder, Shift } from '@/Classes';

const currentResponder = ref<Responder[]>([]);
const currentUsername = 'ahuang';
const shifts_data = ref([]);
const showCurrentShifts = ref(true);
const showAllShifts = () => {
    showCurrentShifts.value = false;
};

const showCurrShifts = () => {
    showCurrentShifts.value = true;
};


try {
    const response = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata`);
    shifts_data.value = response.data;

    const responderResponse = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/responderdata/user/` + currentUsername);
    currentResponder.value = responderResponse.data;
    
} catch (error) {
    console.error('Error fetching shift data:', error);
}
const filteredShifts = computed(() => {
    let today = new Date();

    const filtered: any[] = [];

    for (const shift of shifts_data.value) {

        const [day2, month2, year2] = shift.Date.split('-').map(Number);
        const [hour2, minute2] = shift.End.split(':').map(Number);
        const shiftDate = new Date(year2, month2 - 1, day2, hour2, minute2)

        if (showCurrentShifts.value && shiftDate >= today) {
            filtered.push(shift);
        } else if (!showCurrentShifts.value) {

            filtered.push(shift);
        }
    }

    return filtered;
});


export default {
    methods: {
        async takeShift(shift: Shift) {
            try {
                // Perform the logic for taking the shift here
                // For example, you can make an API call to update the shift status or perform any necessary actions.
                // Assuming you have an API endpoint for taking shifts, modify the URL accordingly.
                const updatedShift = {
                    ...shift,
                    [currentResponder.value[0].Position]: currentResponder.value[0].Name, // Replace 'John Doe' with the actual name or value
                    // Update other fields if needed
                };
                const response = await axios.post(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:3000/api/shiftsdata/update/${shift._id}`, updatedShift);
                
                const updatedResponder = {
                    ...currentResponder.value[0],
                    [currentResponder.value[0][shift.Type]]: [currentResponder.value[0][shift.Type]]+1
                    // Update other fields if needed
                };
                
                console.log(currentResponder);
                // Handle the response or update the UI as needed
               
                console.log('Shift taken successfully:', response.data);
            } catch (error) {
                console.error('Error taking shift:', error);
            }
        },
    },
    data: () => {
        return {
            scheduler: true,
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
    components: { CButton }
}
</script>

<style scoped>
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
    -webkit-text-size-adjust: 100%;


}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

div {
    margin-top: 40px;
    display: block;
    width: 100%;
}
</style>