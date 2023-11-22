<script setup lang="ts">
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

    <CTable :columns="columns" :items="responders">
        <template v-slot:cell(suspended)="data">
            <CButton @click="handleSuspendedButtonClick(data.item)">
                {{ data.item.suspended }}
            </CButton>
        </template>

        <!-- Render custom buttons for the "Admin" column -->
        <template v-slot:cell(admin)="data">
            <CButton @click="handleAdminButtonClick(data.item)">
                {{ data.item.admin }}
            </CButton>
        </template>

        <!-- Render custom buttons for the "Delete" column -->
        <template v-slot:cell(delete)="data">
            <CButton @click="handleDeleteButtonClick(data.item)">
                {{ data.item.delete }}
            </CButton>
        </template>
    </CTable>
</template>
<script lang="ts">

class Responder {
    id: string;
    username: string;
    name: string;
    supervisor: string;
    training: string;
    debrief: string;
    anp: string;
    regular: string;
    position: string;
    SFAexpiry: Date;
    BLSexpiry: Date;
    FRexpiry: Date;
    certExpiration: string;

    constructor(data: any) {
        this.id = data._id.$oid;
        this.username = data.username;
        this.name = data.name;
        this.supervisor = String(data.supervisor);
        this.training = data.training;
        this.debrief = data.debrief;
        this.anp = data.anp.$numberInt;
        this.regular = data.regular.$numberInt;
        this.position = data.position;
        this.SFAexpiry = new Date(data.SFAexpiry);
        this.BLSexpiry = new Date(data.BLSexpiry);
        this.FRexpiry = new Date(data.FRexpiry);
        this.certExpiration = this.getCertExpiration()
    }
    getCertExpiration(): string {
        const dates: Date[] = [this.SFAexpiry, this.BLSexpiry, this.FRexpiry];
        const earliestDate = dates.reduce((a, b) => a < b ? a : b);
        const today = new Date();
        const timeDiff = Math.abs(earliestDate.getTime() - today.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return `${diffDays} days`;
    }
}
const responders = ref([]);
const shiftTypes = ref([]);
const columns = ref([]);
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

    const response = await axios.get('http://localhost:3000/api/responderdata');
    let responderData = response.data.map((data: any) => new Responder(data)); // create a new Responder instance for each data
    const response2 = await axios.get('http://localhost:3000/api/shifttypedata');
    shiftTypes.value = response2.data;


    console.log(responders)
    const shiftTypeColumns = shiftTypes.value.map(shiftType => ({
        key: shiftType.Name.toLowerCase(),
        label: shiftType.Name,
        _props: { scope: "col" },
        default:0,
    }));

    let initialColumns = [
        {
            key: "name",
            label: "Name",
            _props: { scope: "col" },
        },
    ]
    let finalColumns = [

        {
            key: "certExpiration",
            label: "Cert Expiration",
            _props: { scope: "col" },
        },
        {
            key: "position",
            label: "Rank",
            _props: { scope: "col" },
        },
        {
            key: "Suspended",
            _props: { scope: "col" },
        },
        {
            key: "Admin",
            _props: { scope: "col" },
        },
        {
            key: "Delete",
            _props: { scope: "col" },
        },

    ]
    columns.value = [
        ...initialColumns,
        ...shiftTypeColumns,
        ...finalColumns

    ]

    responders.value = responderData.map((responder: any) => {
        let obj: any = {};
        for (let key in responder) {
            const isKeyInColumns = columns.value.some((column: any) => column.key === key);
            console.log(`Is ${key} in columns?`, isKeyInColumns, `${responder[key]}`); // print out the value

            if (isKeyInColumns) {
                obj[key] = responder[key];
            }
        }
        if (!obj.hasOwnProperty('certExpiration')) {
            obj.certExpiration = responder.getCertExpiration();
        }
        // add other additional keys and values as needed...
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